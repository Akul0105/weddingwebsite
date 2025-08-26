// src/components/Footer.tsx

export function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-400 py-12">
            <div className="container mx-auto text-center">
                <p className="font-bold text-lg text-white mb-2">Vivah.mu</p>
                <p>&copy; {new Date().getFullYear()} All Rights Reserved.</p>
                <div className="mt-4 flex justify-center gap-6">
                    <a href="#" className="hover:text-white">About</a>
                    <a href="#" className="hover:text-white">Contact</a>
                    <a href="#" className="hover:text-white">For Vendors</a>
                    <a href="#" className="hover:text-white">Privacy Policy</a>
                </div>
            </div>
        </footer>
    )
}