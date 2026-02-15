import { MessageSent, MessageGet, MessageNotSent } from '@/shared/ui/message/index'

export default function Page() {
  const time = new Date()
  const hours = time.getHours()
  const minutes = time.getMinutes()
  const resTime = `${hours}:${minutes}`

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      gap: "20px",
      padding: "20px"
    }}>
      <MessageGet 
        time={resTime} 
        text="Morem ipsum dolor sit amet, consectetur adipiscing elit." 
      />
      
      <MessageSent 
        time={resTime} 
        text="Sorem ipsum dolor sit amet, consectetur adipiscing elit." 
      />
      
      <MessageNotSent text="Bye" />
    </div>
  )
}