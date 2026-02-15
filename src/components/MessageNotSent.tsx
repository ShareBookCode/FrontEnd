import { Box, Card, CardContent, Typography } from '@mui/material'
import { onest } from '@/shared/fonts'
import React from 'react'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ReplayIcon from '@mui/icons-material/Replay';

interface MessageNotSentProps {
  text: string
}

export const MessageNotSent = ({text}: MessageNotSentProps) => {
  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      maxWidth: 529,
    }}>
      <Box sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "16px"
        }} >
        <ErrorOutlineIcon sx={{color: "#FF2A2A"}}/>
      <Card sx={{
        borderRadius: "12px",
        width: "fit-content",
        display: "flex",
        flexDirection: "column"
      }}>
          
         
        <CardContent sx={{
          bgcolor: "#F1F4F6",
          padding: "9px 14px 9px 10px !important",
          "&:last-child": {
            paddingBottom: "9px",
          },
        }}>
          <Typography sx={{
            color: "#909090",
            fontFamily: onest,
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: 1.2,
            wordBreak: "break-word",
          }}>
            {text}
          </Typography>
        </CardContent>
      </Card>
      </Box>
      <Box sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "16px"
        }}>
          <ReplayIcon  sx={{color: "#FF2A2A"}}/>
          <Typography sx={{
            color: "#FF2A2A",
            fontFamily: onest,
            fontSize: 12,
            fontWeight: 400,
            lineHeight: "120%"
          }}>
            Повторить попытку
          </Typography>
        </Box>
    </Box>
  )
}