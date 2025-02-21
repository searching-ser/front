// app/representante/components/Footer.tsx
export default function RepresentanteFooter() {
    return (
      <footer className="bg-gray-800 text-white py-4 text-center">
        <p className="text-sm">© {new Date().getFullYear()} Representante Section</p>
      </footer>
    );
}