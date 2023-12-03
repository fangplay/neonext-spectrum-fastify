import { type FastifyInstance, type FastifyPluginOptions } from 'fastify'

interface DiaryData{
    title: string
    description: string
    date: Date
}

/** Our simple database for diaries **/ 
const DiariesData: DiaryData[] = [];

export default async function (
    fastify: FastifyInstance,
    opts: FastifyPluginOptions,
): Promise<void>{
    fastify.route({
        url: '/diaries',
        method: 'GET',
        handler: function myHandler(request,reply){
            reply.send({
                message: 'Diaries listed storage ready!',
                success: true,
                data: DiariesData
            })
        },
    })
}