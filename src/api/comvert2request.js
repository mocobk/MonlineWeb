import request from '@/utils/request'

export function convert(rawText) {
    return request({
            url: '/tools/convert2req',
            method: 'post',
            data: {request: rawText}
        }
    )
}

export function run(code) {
    return request({
            url: '/tools/convert2req/run',
            method: 'post',
            data: {code}
        }
    )
}
