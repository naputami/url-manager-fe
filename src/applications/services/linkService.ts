import { TYPES } from "@/infrastructure/constants/types";
import { Link } from "@/infrastructure/interfaces/entities";
import { LinkRepo } from "@/infrastructure/repositories/linkRepo";
import { inject } from "inversify";


export class LinkService {

    constructor(@inject(TYPES.linkRepo) private linkRepo: LinkRepo){}

    async getAllLinks(session: string){
        return this.linkRepo.getAllLinks(session);
    }

    async createNewLink(session: string, data: Pick<Link, "link">){
        return this.linkRepo.createLink(session, data);
    }

    async deleteLink(session: string, id: string){
        return this.linkRepo.deleteLink(session, id);
    }

    async editLink(session: string, data: Partial<Link>){
        return this.linkRepo.editLink(session, data);
    }
}