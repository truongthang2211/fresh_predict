
module.exports = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://127.0.0.1:8080', // Thay đổi URL của backend mà bạn muốn proxy tới
            },
        ];
    },
    async headers() {
        return [
            {
                source: '/api/:path*',
                headers: [
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: '*', // Thiết lập giá trị CORS-Allow-Origin phù hợp với yêu cầu của bạn
                    },
                ],
            },
        ];
    },

};
