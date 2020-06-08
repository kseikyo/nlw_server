import { Request, Response } from 'express';

import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

class PointsController {
  async create(request: Request, response: Response) {
    
    const { city, email, name, uf, whatsapp, items } = request.body;

    const trimmedItems = items
      .split(',')
      .map((item: string) => Number(item.trim()));

    const latitude = Number(request.body.latitude);
    const longitude = Number(request.body.longitude);

    const insertedPoint = await prisma.points.create({
      data: {
        image: request.file.filename,
        city,
        email,
        latitude,
        longitude,
        name,
        uf,
        whatsapp,
        Items: {
          connect: trimmedItems
            .map((item: number) => {
              return {
                id: item
              }
            })
        }
      }
    });

    return response.json(insertedPoint);
  };

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const point = await prisma.points.findOne({
      where: {
        id: Number(id)
      },
      include: {
        Items: {
          select: {
            title: true
          }
        }
      }
    });

    if (!point) {
      return response.status(400).json({ message: 'Point not found.' });
    }

    const serializedPoint = {
      ...point,
      image_url: `${process.env.PORT + '/uploads/' || 'http://192.168.0.104:3333/uploads/'}${point.image}`
    };

    return response.json(serializedPoint);
  };

  async index(request: Request, response: Response) {
    const { city, uf, items }: { city?: string, uf?: string, items?: string } = request.query;

    const parsedItems = String(items)
      .split(',')
      .map(item => Number(item.trim()));


    

    const points = await prisma.points.findMany({
      where: {
        city: city,
        uf: uf,
        AND: [
          {
            Items: {
              some: {
                OR: parsedItems.map(item => {
                  return {
                    id: item
                  }
                })
              }
            }
          }
        ]
      },
      include: {
        Items: true
      }
    });


    if (!points) {
      return response.status(400).json({ message: 'There are no Points with the requested parameters.' })
    }

    const serializedPoints = points.map(point => {
      return {
        ...point,
        image_url: `${process.env.PORT + '/uploads/' || 'http://192.168.0.104:3333/uploads/'}${point.image}`
      }
    });

    return response.json(serializedPoints)
  };
}

export default PointsController;