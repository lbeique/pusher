import Pusher from 'pusher'

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      res.status(200).json({ name: 'John Doe' })
      break
    case 'POST':
      const message = req.body.message

      const Pusher = require("pusher");

      const pusher = new Pusher({
        appId: "1513436",
        key: "a50b039438a2d6b0a70c",
        secret: "c9dbefd63c66bea5a757",
        cluster: "us3",
      });

      const color = Math.floor(Math.random()*16777215).toString(16)
  
      await pusher.trigger("messages", "message-event", {
        message, color
      });

      res.status(200).json({ message, color })
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
