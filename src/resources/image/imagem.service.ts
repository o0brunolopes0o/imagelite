import { Image } from './image.resource'

class ImagemService {
    baseUrl: string = 'http://localhost:8080/v1/images';

    async buscar(query: string = '', extension: string = '') : Promise<Image []> {
        const url = `${this.baseUrl}?query=${query}&extension=${extension}`
        const response = await fetch(url);
        return await response.json();
    }
}

export const useImageService = () => new ImagemService();