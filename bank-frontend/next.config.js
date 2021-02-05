module.exports = {
    distDir: process.env.NODE_ENV === "development" ? `.next-${process.env.NEXT_PUBLIC_BANK_CODE}` : '.next',
    async redirects(){
        return [
            {
                source: '/',
                destination: '/bank-accounts',
                permanent: true
            }
        ]
    }
}