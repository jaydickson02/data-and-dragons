

export default function testApi(req, res) {
    console.log("testApi called")
    res.status(200).json({ name: 'John Doe' })
  }