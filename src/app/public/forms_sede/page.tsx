"use client"
import { useAppStore } from "@/lib/state/AppState"
import { useEffect, useState } from "react"
import { SedeCreateType } from "@/lib/schemas/sede_schemas"
import { countries } from "@/lib/json_dictionaries/countries"
import { createSede } from "@/lib/handlers/sede_handlers"
import { useRouter } from "next/navigation"

export default function RegisterParticipante() {
  const getEntidades = useAppStore(state => state.fetchEntidades)
  const entidades = useAppStore(state => state.entidades)

  useEffect(() => {
    getEntidades()
  }, [])  

  const [sedeInfo, setSedeInfo] = useState<SedeCreateType>({
    legal_form: null, 
    logo: null, 
    has_read_terms: false, 
    name: "",
    address: "",
    city: "",
    country: "Mexico", // Default country
    rep_name: "",
    rep_email: "",
    type: "PRESENCIAL",
    group_num: 0,
    group_capacity: 0,
    has_collaborators: false,
    open_to_public: false,
    english_group_num: 0,
    spanish_group_num: 0,
    advanced_group_num: 0,
    basic_group_num: 0,
    first_time: false,
    state_id: 1,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement >) => {
    const { name, type, value } = e.target;
  
    if (e.target instanceof HTMLInputElement && type === "checkbox") {
      setSedeInfo(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked, // Now TypeScript knows it's a checkbox
      }));
    } else {
      setSedeInfo(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setSedeInfo(prev => ({
        ...prev,
        [name]: files[0],
      }));
    }
  };

  const [messageText, setMessageText] = useState("");
  const [messageColor, setMessageColor] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const totalSubGroups = 
    +sedeInfo.english_group_num + 
    +sedeInfo.spanish_group_num + 
    +sedeInfo.advanced_group_num + 
    +sedeInfo.basic_group_num;

    // Validate the sum condition
    if (totalSubGroups / 2 !== +sedeInfo.group_num) {
      setMessageText("The sum of all subgroup numbers must be exactly half of the total group number.");
      setMessageColor("bg-red-100 border border-red-500 text-red-700");
      setTimeout(() => setMessageText(""), 5000);
      return;
    }

    setIsLoading(true);
    setMessageText("Submitting...");
    setMessageColor("bg-yellow-100 border border-yellow-500 text-yellow-700");

    try {
      const response = await createSede(sedeInfo);
      setMessageText("Sede Created Successfully!");
      setMessageColor("bg-green-100 border border-green-500 text-green-700");
      console.log("Sede Response:", response);
      setTimeout(() => setMessageText(""), 5000);
      setIsSuccess(true);
    } catch (error: any) {
      setMessageText(error.message || "Failed to create Sede");
      setMessageColor("bg-red-100 border border-red-500 text-red-700");

      // Hide error message after 5 seconds
      setTimeout(() => setMessageText(""), 5000);
    } finally {
      setIsLoading(false)
    }
  }

  if (!entidades) return <p>Loading...</p>;

  return (
    <>
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-2xl rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-3">Register a Sede</h2>
      <div className="flex flex-col space-y-2 mb-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="has_read_terms"
            checked={sedeInfo.has_read_terms}
            onChange={handleChange}
            className="mr-2"
          />
          <span className="text-gray-700">I have read the terms</span>
        </label>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Name */}
        <div>
          <label className="block text-gray-700 font-medium">Sede Name</label>
          <input
            type="text"
            name="name"
            value={sedeInfo.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Country Selection */}
        <div>
          <label className="block text-gray-700 font-medium">Country</label>
          <select
            name="country"
            value={sedeInfo.country}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md bg-white"
          >
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>

        {/* Address */}
        <div>
          <label className="block text-gray-700 font-medium">Address</label>
          <input
            type="text"
            name="address"
            value={sedeInfo.address}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-gray-700 font-medium">City</label>
          <input
            type="text"
            name="city"
            value={sedeInfo.city}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* State Selection */}
        <div>
          <label className="block text-gray-700 font-medium">State</label>
          <select
            name="state_id"
            value={sedeInfo.state_id}
            onChange={handleChange}
            required
            className="w-full mb-4 p-2 border rounded-md bg-white"
          >
            {entidades.map(entidad => (
              <option key={entidad.id} value={entidad.id}>
                {entidad.name}
              </option>
            ))}
          </select>

          {/* Type Selection */}
          <div>
            <label className="block text-gray-700 font-medium">Type</label>
            <select
              name="type"
              value={sedeInfo.type}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md bg-white"
            >
              <option value="PRESENCIAL">In-Person</option>
              <option value="ONLINE">Online</option>
            </select>
          </div>

          {/* Legal Form Upload */}
          <div className="mt-4">
            <label className="block text-gray-700 font-medium">Legal Form</label>
            <input
              type="file"
              name="legal_form"
              onChange={handleFileChange}
              required
              className="w-full mb-4 p-2 border rounded-md"
            />
          </div>

          {/* Logo Upload */}
          <div>
            <label className="block text-gray-700 font-medium">Logo</label>
            <input
              type="file"
              name="logo"
              onChange={handleFileChange}
              required
              className="w-full mb-4 p-2 border rounded-md"
            />
          </div>

          {/* Representative Name */}
          <div>
            <label className="block text-gray-700 font-medium">Representative Name</label>
            <input
              type="text"
              name="rep_name"
              value={sedeInfo.rep_name}
              onChange={handleChange}
              required
              className="w-full mb-4 p-2 border rounded-md"
            />
          </div>

          {/* Representative Email */}
          <div>
            <label className="block text-gray-700 font-medium">Representative Email</label>
            <input
              type="email"
              name="rep_email"
              value={sedeInfo.rep_email}
              onChange={handleChange}
              required
              className="w-full mb-4 p-2 border rounded-md"
            />
          </div>

          {/* Group Information */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-medium">Group Number</label>
              <input
                type="number"
                name="group_num"
                value={sedeInfo.group_num}
                onChange={handleChange}
                min="0"
                required
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Group Capacity</label>
              <input
                type="number"
                name="group_capacity"
                value={sedeInfo.group_capacity}
                onChange={handleChange}
                min="0"
                required
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          {/* Specific Group Types */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-medium">English Groups</label>
              <input
                type="number"
                name="english_group_num"
                value={sedeInfo.english_group_num}
                onChange={handleChange}
                min="0"
                required
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Spanish Groups</label>
              <input
                type="number"
                name="spanish_group_num"
                value={sedeInfo.spanish_group_num}
                onChange={handleChange}
                min="0"
                required
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Advanced Groups</label>
              <input
                type="number"
                name="advanced_group_num"
                value={sedeInfo.advanced_group_num}
                onChange={handleChange}
                min="0"
                required
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Basic Groups</label>
              <input
                type="number"
                name="basic_group_num"
                value={sedeInfo.basic_group_num}
                onChange={handleChange}
                min="0"
                required
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          {/* Checkbox Fields */}
          <div className="flex flex-col space-y-2 mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="open_to_public"
                checked={sedeInfo.open_to_public}
                onChange={handleChange}
                className="mr-2"
              />
              <span className="text-gray-700">Open to Public</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                name="has_collaborators"
                checked={sedeInfo.has_collaborators}
                onChange={handleChange}
                className="mr-2"
              />
              <span className="text-gray-700">Has Collaborators</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                name="first_time"
                checked={sedeInfo.first_time}
                onChange={handleChange}
                className="mr-2"
              />
              <span className="text-gray-700">First Time Hosting</span>
            </label>
          </div>
          
          {/* Status Message Box */}
          {messageText && (
            <div className={`p-3 mb-4 rounded-md ${messageColor}`}>
              {messageText}
            </div>
          )}
          
          {/* Submit Button */}
          {/* Conditional Button Logic */}
          {isLoading ? (
            <></>
          ) : (
            <>
            {isSuccess === false && (
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold p-2 rounded-md hover:bg-blue-700 transition"
              >
                Register Sede
              </button>
            )}
            </>
          )}

          {isSuccess && (
            <div
              onClick={() => router.push("/")} // Navigate to homepage
              className="w-full bg-green-600 text-white font-bold p-2 rounded-md hover:bg-green-700 transition"
            >
              Go to Homepage
            </div>
          )}
        </div>
      </form>
    </div>
    </>
  )
}
