import * as v from "valibot"

// many 
export const SedesSchema = v.object({
    id: v.number(),
    name: v.string(),
    email: v.string(),
    date: v.string(), // You can add a regex pattern for YYYY-MM-DD validation if needed
    state: v.string(),
});

export const SedesSchemaList = v.object({
    sedes: v.array(SedesSchema)
})

export type SedesType = {
    id: number;
    name: string;
    email: string;
    date: string; // ISO date format "YYYY-MM-DD"
    state: string;
}

// individual

const SedeUserSchema = v.object({
    id: v.number(),
    name: v.string(),
    email: v.string(),
});

const SedeGroupSchema = v.object({
    id: v.number(),
    level: v.picklist(["ADVANCED", "BASIC"]), // Restrict to known levels
    language: v.picklist(["ENGLISH", "SPANISH"]), // Restrict to known languages
});

const CollaboratorSchema = v.object({
    id: v.number(),
    name: v.string(),
    email: v.string(),
});

export const SedeSchema = v.object({
    id: v.number(),
    legal_form_url: v.string(),
    logo_url: v.string(),
    has_read_terms: v.boolean(),
    name: v.string(),
    address: v.string(),
    city: v.string(),
    country: v.string(),
    rep_name: v.string(),
    rep_email: v.string(),
    type: v.picklist(["PRESENCIAL", "VIRTUAL", "HIBRIDO"]), 
    group_num: v.number(),
    group_capacity: v.number(),
    date: v.string(), 
    has_collaborators: v.boolean(),
    open_to_public: v.boolean(),
    english_group_num: v.number(),
    spanish_group_num: v.number(),
    advanced_group_num: v.number(),
    basic_group_num: v.number(),
    first_time: v.boolean(),
    state_id: v.number(),
    state: v.string(),
    users: v.array(SedeUserSchema),
    participantes: v.array(SedeUserSchema), 
    groups: v.array(SedeGroupSchema),
    collaborators: v.array(CollaboratorSchema),
    mentoras: v.array(SedeUserSchema),
    informers: v.array(SedeUserSchema),
});
  
// types
export type SedeCreateType = {
    legal_form: File | null; // Can start as null, then updated with a File
    logo: File | null; // File object for AWS S3
    has_read_terms: boolean;
    name: string;
    address: string;
    city: string;
    country?: string; // Defaults to "Mexico" if not provided
    rep_name: string;
    rep_email: string;
    type: string;
    group_num: number;
    group_capacity: number;
    has_collaborators: boolean;
    open_to_public: boolean;
    english_group_num: number;
    spanish_group_num: number;
    advanced_group_num: number;
    basic_group_num: number;
    first_time: boolean;
    state_id: number; // Foreign key reference
};

export type SedeType = {
    id: number;
    legal_form_url: string;
    logo_url: string;
    has_read_terms: boolean;
    name: string;
    address: string;
    city: string;
    country?: string;
    rep_name: string;
    rep_email: string;
    type: "PRESENCIAL" | "VIRTUAL" | "HIBRIDO";
    group_num: number;
    group_capacity: number;
    date: string; // ISO YYYY-MM-DD
    has_collaborators: boolean;
    open_to_public: boolean;
    english_group_num: number;
    spanish_group_num: number;
    advanced_group_num: number;
    basic_group_num: number;
    first_time: boolean;
    state_id: number;
    state: string;
    users: SedeUserType[];
    participantes: SedeUserType[];
    groups: SedeGroupType[];
    collaborators: CollaboratorType[];
    mentoras: SedeUserType[];
    informers: SedeUserType[];
};

export type SedeUserType = {
    id: number;
    name: string;
    email: string;
};

export type SedeGroupType = {
    id: number;
    level: "ADVANCED" | "BASIC";
    language: "ENGLISH" | "SPANISH";
};

export type CollaboratorType = {
    id: number;
    name: string;
    email: string;
};

export const initialSede: SedeType = {
    id: 0,
    legal_form_url: "",
    logo_url: "",
    has_read_terms: false,
    name: "",
    address: "",
    city: "",
    country: "Mexico", // Default to "Mexico"
    rep_name: "",
    rep_email: "",
    type: "PRESENCIAL", // Default to a valid type
    group_num: 0,
    group_capacity: 0,
    date: "", // Should be set to a valid "YYYY-MM-DD" when used
    has_collaborators: false,
    open_to_public: false,
    english_group_num: 0,
    spanish_group_num: 0,
    advanced_group_num: 0,
    basic_group_num: 0,
    first_time: false,
    state_id: 0,
    state: "",
    users: [],
    participantes: [],
    groups: [],
    collaborators: [],
    mentoras: [],
    informers: [],
};