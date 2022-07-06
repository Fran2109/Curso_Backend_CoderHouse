const apiControllers = {
    productosTest: (req, res) => {
        res.sendFile('indexTest.html', { root: './public/views' })
    },
    getName: async (req, res) => {
        const user = await req.user;
        res.status(200).json({name: user?.username});
    }
}

export default apiControllers;