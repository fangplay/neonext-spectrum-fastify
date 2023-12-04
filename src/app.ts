import { type FastifyInstance, type FastifyPluginOptions } from 'fastify'
import Sensible from '@fastify/sensible'


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
){
    await fastify.register(Sensible)

    // GET /diaries endpoint
    fastify.route({
        url: '/diaries',
        method: 'GET',
        handler: function myHandler(request, reply) {
          reply.send({
              message: 'Diaries listed successfully',
              success: true,
              data: DiariesData
          })
        },
    })

    fastify.route({
        url: '/diaries',
        method: 'POST',
        handler: function handler(request,reply){
            const data = request.body as DiaryData
            if(!data?.title || !data?.description || !data?.date){
                throw fastify.httpErrors.badRequest(
                    'Please ensure all information',
                )
            }
            DiariesData.push({
                title: data.title,
                description: data.description,
                date: data.date
            })

            reply.send({
                message: 'Diary added successfully',
                seccess: true,
                data: null,
            })
        },
    })

    fastify.get('/diaries/:diarySearch',function getDiary(request,reply){
        const requestParam = request.params as { diarySearch: string }
        const searchingFor = requestParam.diarySearch
        const result = DiariesData.filter(diary => diary.title === searchingFor)
        if(result){
            return{
                message: 'Diary found successfully',
                success: true,
                data: result,
            }
        }else{
            throw fastify.httpErrors.notFound(
                'Could not find diary with keyword: ${searchingFor}',
            )
        }
    })
}