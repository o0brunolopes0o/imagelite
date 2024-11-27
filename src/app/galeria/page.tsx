'use client'

import { Template, ImageCard } from '@/components'
import { useImageService } from '@/resources/image/imagem.service'
import { useState } from "react";
import { Image } from "@/resources/image/image.resource";

export default function Home() {
    const useService = useImageService()
    const [images, setImages] = useState<Image[]>([])
    const [query, setQuery] = useState<string>('')
    const [extension, seExtension] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    function formatDate(isoDate?: string): string {
        if (!isoDate) return "Data inválida";
        const [year, month, day] = isoDate.split('-');
        return `${day}/${month}/${year}`;
    }

    function formatSize(bytes?: number): string {
        if (bytes === undefined) return "Tamanho inválido";
        const megabytes = bytes / (1024 * 1024);
        return `${megabytes.toFixed(2)} MB`;
    }

    async function searchImages() {
        setLoading(true);
        const MIN_LOADING_TIME = 1000; // Tempo mínimo de carregamento em milissegundos

        try {
            const startTime = Date.now(); // Marca o início do carregamento

            // Realiza a busca pelas imagens
            const result = await useService.buscar(query, extension);

            // Garante um atraso mínimo
            const elapsedTime = Date.now() - startTime;
            if (elapsedTime < MIN_LOADING_TIME) {
                await new Promise(resolve => setTimeout(resolve, MIN_LOADING_TIME - elapsedTime));
            }

            setImages(result);
        } catch (error) {
            console.error('Erro ao buscar imagens: ', error);
        } finally {
            setLoading(false); // Apenas desativa o estado de carregamento após o atraso
        }
    }

    function renderImageCard(image: Image) {
        const imageSize = typeof image.size === 'string' ? parseInt(image.size) : image.size;

        return (
            <ImageCard
                key={image.id}
                nome={image.name || "Nome desconhecido"}
                extensao={image.extension || "Extensão desconhecida"}
                src={image.url || ""}
                tamanho={formatSize(imageSize)} // Passa o tamanho convertido
                dataUpload={formatDate(image.uploadDate)}
            />
        )
    }

    function renderImageCards() {
        return images.map(renderImageCard)
    }

    return (
        <Template loading={loading}>
            <section className="flex flex-col items-center justify-center my-5">
                <div className="flex space-x-4">
                    <input type="text"
                           onChange={event => setQuery(event.target.value)}
                           className="border px-3 py-2 rounded-lg text-gray-900"/>
                    <select
                        onChange={event => seExtension(event.target.value)}
                        className="border px-4 py-2 rounded-lg text-gray-900">
                        <option value="">Todos</option>
                        <option value="PNG">PNG</option>
                        <option value="JPEG">JPEG</option>
                        <option value="GIF">GIF</option>
                    </select>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400" onClick={searchImages}>Buscar</button>
                    <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-400">Adicionar</button>
                </div>
            </section>
            <section className="grid grid-cols-3 gap-8">
                {
                    renderImageCards()
                }
            </section>
        </Template>
    )
}
