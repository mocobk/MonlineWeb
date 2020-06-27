import request from "@/utils/request"

export function convert(rawText){
    return request({
        url: '/convert2req',
        method: 'post',
        data: {request: rawText}}
    )
}
