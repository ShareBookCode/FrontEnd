"use client"

import React, { useState } from 'react'
import { Box, Card, CardContent, CardHeader, Container, IconButton, Typography } from "@mui/material"
import Image, { StaticImageData } from 'next/image'
import { useRouter } from 'next/navigation'
import { literata, onest } from '@/shared/fonts'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { BookCardData } from '@/shared/lib/BookCardData'

interface BookCard {
    id: number;
    image: string | StaticImageData;
    title: string;
    author: string;
    subTitle: string;
}

interface BookCardProps {
    item: BookCard;
}

const BookCard = ({ item }: BookCardProps) => {
    const [isFavorite, setIsFavorite] = useState(false)
    const router = useRouter()

    const handleCardClick = () => {
        router.push(`/book/${item.id}`)
    }

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsFavorite(!isFavorite)  
    }

    return (
        <Card 
            onClick={handleCardClick}
            sx={{
                width: "242px",
                height: "460px",
                display: "flex",
                flexDirection: "column",
                boxShadow: "none",
                borderRadius: 4,
                cursor: 'pointer',
                '&:hover': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                },
            }}
        >
            <CardHeader
                sx={{
                    p: 0,
                    width: "202px",
                    height: "304px",
                    m: "20px 20px 0 20px", 
                    position: "relative",
                }}
                title={
                    <Box sx={{ position: 'relative' }}>
                        <Image 
                            width={202} 
                            height={304} 
                            alt={item.title}
                            src={item.image } 
                            style={{
                                borderRadius: '4px',
                                objectFit: 'cover'
                            }}
                        />
                        <IconButton
                            onClick={handleFavoriteClick}
                            sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                },
                                padding: '4px',
                                zIndex: 1
                            }}
                        >
                            {isFavorite ? (
                                <FavoriteIcon sx={{ color: '#FF3B3B', fontSize: 20 }} />
                            ) : (
                                <FavoriteBorderIcon sx={{ color: '#666', fontSize: 20 }} />
                            )}
                        </IconButton>
                    </Box>
                }
            />
            <CardContent 
                sx={{
                    p: "0 20px 20px 20px",
                }}
            >
                <Typography sx={{
                    fontFamily: literata,
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "130%",
                    color: "black",
                    mb: "8px"
                }}>
                    {item.title}
                </Typography>
                
                <Typography sx={{
                    fontFamily: onest,
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "100%",
                    color: "#2A7FFF",
                    mb: "12px",
                }}>
                    {item.author}
                </Typography>
                
                <Typography sx={{
                    fontFamily: onest,
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "100%",
                    color: "#909090",
                }}>
                    {item.subTitle}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default function HomePage() {    
    const dataCards: BookCard[] = BookCardData

    return (
        <Container sx={{
            maxWidth: "1365px", 
            px: "35px", 
            py: "30px",
        }}>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: "30px", 
            }}>
                {dataCards.map((item) => (
                    <BookCard key={item.id} item={item} />
                ))}
            </Box>
        </Container>
    )
}