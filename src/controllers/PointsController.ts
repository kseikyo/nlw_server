import { Request, Response } from 'express';

import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

class PointsController {
  async create(request: Request, response: Response) {
    const { image, city, email, latitude, longitude, name, uf, whatsapp, items } = request.body;

    const insertedPoint = await prisma.points.create({
      data: {
        image,
        city,
        email,
        latitude,
        longitude,
        name,
        uf,
        whatsapp,
        Items: {
          connect: items.map((item: number) => {
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

    return response.json(point);
  };

  async index(request: Request, response: Response) {
    const { city, uf, items }: { city?: string, uf?: string, items?: string } = request.query;

    const parsedItems = String(items)
      .split(',')
      .map(item => Number(item.trim()))


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
      return response.status(400).json({ message: 'There are no Points with the requested parameters.'})
    }

    return response.json( points )
  };
}

export default PointsController;