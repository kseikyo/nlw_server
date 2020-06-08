import { Request, Response } from 'express';

import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

class ItemsController {
  async index (request: Request, response: Response) {
    const items = await prisma.items.findMany();
  
    const serializedItems = items.map(item => {
      return {
        id: item.id,
        title: item.title,
        image_url: `${process.env.PORT + '/uploads/' || 'http://192.168.0.104:3333/uploads/'}${item.image}`
      }
    })
  
    return response.json(serializedItems);
  };
}

export default ItemsController;