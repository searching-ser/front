"use client"
import { useAppStore } from "@/lib/state/AppState";
import { useEffect } from "react";
import { useParams } from "next/navigation";

export default function SuperuserDashboard() {
    const sedes = useAppStore(state => state.sedes)
    const getSedes = useAppStore(state => state.fetchSedes)

    const entidades = useAppStore(state => state.entidades)
    const getEntidades = useAppStore(state => state.fetchEntidades)

    useEffect(() => {
        getSedes()
        getEntidades()
    }, [])

    console.log(sedes)
    console.log(entidades)
    return (
        <div className="text-center py-20">
            <h1 className="text-3xl font-bold">Welcome, Superuser!</h1>
            <p>This is the superuser dashboard.</p>
        </div>
    );
}