interface ImageCardProps {
    key?: string,
    nome?: string,
    tamanho?: string,
    dataUpload?: string,
    src?: string,
    extensao?: string
}

export const ImageCard: React.FC<ImageCardProps> = ({nome, tamanho, dataUpload, src, extensao}: ImageCardProps) => {
    return (
        <div
            className="card relative bg-white rounded-md shadow-md transition-transform ease-in duration-300 transform hover:shadow-lg hover:-translate-y-2">
            <img
                src={src}
                className="h-56 w-full object-cover rounded-t-md"
                alt="Imagem de exemplo"
            />
            <div className="card-body p-4">
                <h5 className="text-xl font-semibold mb-2 text-gray-600">{nome}</h5>
                <p className="text-gray-600">Extensão: {extensao}</p>
                <p className="text-gray-600">Tamanho: {tamanho}</p>
                <p className="text-gray-600">Data Upload: {dataUpload}</p>
            </div>
        </div>
    );
};
