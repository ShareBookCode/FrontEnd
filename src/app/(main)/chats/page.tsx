import {MessageGet} from "@/components/MessageGet";
import { MessageNotSent } from "@/components/MessageNotSent";
import { MessageSent } from "@/components/MessageSent";
import { Box } from "@mui/material";


export default function Page() {

  const time = new Date()
  const hours = time.getHours()
  const minutes = time.getMinutes()
  const resTime = `${hours}:${minutes}`

  return (
   <Box sx={{
    mt: "5px",
    mx: "10px",
    gap: "10px",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start"
   }}>
     <MessageGet time={resTime} text="Morem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis." />

    <MessageSent time={resTime} text="Sorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent "/>

    <MessageNotSent text="Bye" />

   </Box>
  )
}
