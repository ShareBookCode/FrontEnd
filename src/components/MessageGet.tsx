import { onest } from '@/shared/fonts'
import { Box, Card, CardContent, Typography } from '@mui/material'
import React from 'react'

interface MessageGetProps {
  text: string
  time: string
}

export const MessageGet = ({text, time}: MessageGetProps) => {
  return (
    <Box sx={{
        width: 529,
        bgcolor: "#F1F4F6"
    }}>
        <Card sx={{
            maxWidth: 476,
            display: "flex",
            bgcolor: "#F1F4F6",
            boxShadow: "none",
            borderRadius: "12px"
        }}>
            <CardContent sx={{ 
                display: "flex", 
                flexDirection: "row", 
                alignItems: "flex-end",
                p: "9px 10px",
                '&:last-child': { 
                    pb: "8px"
                }
            }}>
                <Typography sx={{
                    mr: "5px",
                    color: "black",
                    fontFamily: onest,
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: 1.2
                }}>
                    {text}
                </Typography>
                {time && (
                    <Typography sx={{
                        color: "#909090",
                        fontFamily: onest,
                        fontWeight: 400,
                        fontSize: "12px",
                        lineHeight: 1.2,
                        alignSelf: "flex-end"
                    }}>
                        {time}
                    </Typography>
                )}
            </CardContent>
        </Card>
    </Box>
  )
}