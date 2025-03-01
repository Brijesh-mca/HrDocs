export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-8 mt-auto">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
                    
                    {/* About Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">About</h3>
                        <p>HR Letter PDF Generator</p>

                        <h3 className="text-lg font-semibold mt-4">Support my work</h3>
                        <p>I charge nothing for the templates. I don't ask for registration on my site either.</p>
                        <p>Hope you‘d like to support my work.</p>

                        <p className="mt-2">
                            <a href="#" className="text-blue-400 hover:underline">Changelog and planned</a>
                        </p>
                        <h3 className="mt-4">Made By Einfratech</h3>
                    </div>

                    {/* Follow Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Follow Hr PDF Gen:</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-blue-400 hover:underline">Instagram</a>
                            </li>
                            <li>
                                <a href="#" className="text-blue-400 hover:underline">Facebook</a>
                            </li>
                            <li>
                                <a href="#" className="text-blue-400 hover:underline">Portfolio</a>
                            </li>
                        </ul>

                        <h3 className="text-lg font-semibold mt-4">Translations</h3>
                        <p>All translations are done by volunteers (thank you!)</p>
                        <p>
                            <a href="#" className="text-blue-400 hover:underline">Add terms</a> to the translation.
                        </p>

                        <h3 className="text-lg font-semibold mt-4">Privacy</h3>
                        <p>
                            Read my{" "}
                            <a href="#" className="text-blue-400 hover:underline">privacy policy</a>
                        </p>
                    </div>

                    {/* Legal Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Legal and Copyright ©</h3>
                        <p>
                            All content on this website, including text, graphics, logos, images, and software, is COPYRIGHT. 
                            However, permission is granted to print and mass-produce the templates for packaging 
                            or educational purposes. Re-publication in print (other than packaging) or digital medium is <em>not</em> allowed.
                        </p>
                        <p className="mt-2">
                            This means: do anything you want with the templates from my site, but do not compete using them.
                        </p>
                    </div>
                </div>

                {/* Bottom Copyright Section */}
                <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
                    <p>© 2025 Your Company. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}