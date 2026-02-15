"use client"

import React, { useState } from 'react'
import { Box, Card, CardContent, CardHeader, Container, IconButton, Typography } from "@mui/material"
import Image from 'next/image'
import Link from 'next/link'
import { literata, onest } from '@/shared/fonts'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface BookCard {
    id: number;
    image: string;
    title: string;
    author: string;
    subTitle: string;
}

interface BookCardProps {
    item: BookCard;
}

const BookCard = ({ item }: BookCardProps) => {
    const [isFavorite, setIsFavorite] = useState(false)

    return (
        <Card sx={{
            width: "242px",
            height: "460px",
            display: "flex",
            flexDirection: "column",
            boxShadow: "none"
        }}>
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
                            alt=""
                            src={item.image } 
                            style={{
                                borderRadius: '4px',
                                objectFit: 'cover'
                            }}
                        />
                        <IconButton
                            onClick={() => setIsFavorite(!isFavorite)}
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
                    mt: "8px",
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
                <Link href="/book" style={{ textDecoration: 'none' }}>
                    <Typography sx={{
                        fontFamily: onest,
                        fontSize: "14px",
                        fontWeight: 500,
                        lineHeight: "100%",
                        color: "#2A7FFF",
                        mb: "12px",
                        cursor: 'pointer',
                        '&:hover': {
                            textDecoration: 'underline'
                        }
                    }}>
                        {item.author}
                    </Typography>
                </Link>
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
    const dataCards: BookCard[] = [
        {
            id: 1,
            image: "",
            title: "Старик и море, Зеленые холмы Африки",
            author: "Эрнест Хэмингуэй",
            subTitle: "Санкт-Петербург, Московский район"
        },
        {
            id: 2,
            image: "",
            title: "Старик и море, Зеленые холмы Африки",
            author: "Эрнест Хэмингуэй",
            subTitle: "Санкт-Петербург, Московский район"
        },
        {
            id: 3,
            image: "",
            title: "Старик и море, Зеленые холмы Африки",
            author: "Эрнест Хэмингуэй",
            subTitle: "Санкт-Петербург, Московский район"
        },
        {
            id: 4,
            image: "",
            title: "Старик и море, Зеленые холмы Африки",
            author: "Эрнест Хэмингуэй",
            subTitle: "Санкт-Петербург, Московский район"
        },
        {
            id: 5,
            image: "",
            title: "Старик и море, Зеленые холмы Африки",
            author: "Эрнест Хэмингуэй",
            subTitle: "Санкт-Петербург, Московский район"
        },
    ]

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