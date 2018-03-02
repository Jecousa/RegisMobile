import { Album } from "../models/album";

export class albumService {
    private albums: Album[]= [];

    newAlbum(fName: string, lName: string, phone: number, image: string) {
        this.albums.push(new Album(fName, lName, phone, image));
        console.log(this.albums);
    }

    showAlbum(items: Album[]) {
        this.albums.push(...items);
    }

    getAlbums() {
        return this.albums.slice();
    }

    deleteAlbum(index: number) {
        this.albums.splice(index, 1);
    }
}