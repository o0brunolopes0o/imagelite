interface TemplateProps {
    children: React.ReactNode;
}

export const Template: React.FC<TemplateProps> = (props) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
                <div className="container mx-auto mt-8 flex-grow">
                    {props.children}
                </div>
            <Footer />
        </div>
    );
};

const Header: React.FC = () => {
    return (
        <header className="bg-indigo-950 text-white py-3">
            <div className="container mx-auto flex justify-between items-center px-4">
                <h1 className="text-3xl font-bold">ImageLite</h1>
            </div>
        </header>
    );
};

const Footer: React.FC = () => {
    return (
        <footer className="bg-indigo-950 text-white py-4 mt-8">
            <div className="container mx-auto text-center">
                Desenvolvido por Bruno Lopes
            </div>
        </footer>
    );
};
