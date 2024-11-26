'use client'

import { Template, ImageCard } from '@/components'
import { useImageService } from '@/resources/image/imagem.service'
import { useState } from "react";
import { Image } from "@/resources/image/image.resource";

export default function Home() {
    const useService = useImageService()
    const [images, setImages] = useState<Image[]>([])

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
        try {
            const result = await useService.buscar();
            setImages(result);
            console.table(result)
        } catch (error) {
            console.error('Erro ao buscar imagens: ', error)
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
        <Template>
            <button onClick={searchImages} className="mt-4 mb-3 bg-blue-500 text-white px-4 py-2 rounded-md">Buscar</button>
            <section className="grid grid-cols-3 gap-8">
                {
                    renderImageCards()
                }
            </section>
        </Template>
    )
}
