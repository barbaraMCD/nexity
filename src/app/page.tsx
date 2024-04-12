"use client";
import React, {useEffect, useState} from "react";
import csv from "csv-parser";
import Card from "@/components/Card";

export interface bienImmo {
    Id: string;
    Name: string;
    City: string;
    PostalCode: string;
    Latitude: number;
    Longitude: number;
    Transports: Transports[];
    Price: number;
    NbRoomsMin: number;
    NbRoomsMax: number;
    Picture: string;
    isFavorite: boolean;
}

export interface Favorite {
    Id: string;
}

export interface Transports {
    ChainePoints: string;
    Couleur: string
    en_construction: string;
    id_ligne: string;
    id_theme_2: string;
    ligne: string;
}

export default function Home() {
    const [data, setData] = useState<bienImmo[]>([]);
    const [favorites, setFavorites] = useState<Favorite[]>([]);

    const fetchCSV = async () => {
        try {
            const response = await fetch('/properties.csv');
            const csvData = await response.text();

            csv({ separator: ',' })
                .on('data', async (data) => {
                    let newBienImmo: bienImmo = {
                        Id: data.Id,
                        Name: data.Name,
                        City: data.City,
                        PostalCode: data.PostalCode,
                        Latitude: parseFloat(data.Latitude),
                        Longitude: parseFloat(data.Longitude),
                        Price: data.Price,
                        Transports: [],
                        NbRoomsMin: parseInt(data.NbRoomsMin),
                        NbRoomsMax: parseInt(data.NbRoomsMax),
                        Picture: data.Picture,
                        isFavorite: false,
                    };
                    try {
                        const res = await fetch(`https://preprod.kitlenid.fr/api/transport?lon=${data.Longitude}&lat=${data.Latitude}`);
                        newBienImmo.Transports = await res.json();
                    } catch (error) {
                        console.error('Erreur lors du chargement du fichier CSV:', error);
                    }
                    setData(prevData => [...prevData, newBienImmo]);
                })
                .write(csvData);
        } catch (error) {
            console.error('Erreur lors du chargement du fichier CSV:', error);
        }
    };

    useEffect(() => {
        fetchCSV();
    }, []);


    const handleAddToFavorites = (id: string) => {
      data.map((bienImmo) => {
           if (bienImmo.Id === id) {
                    bienImmo.isFavorite = !bienImmo.isFavorite;
                    if (bienImmo.isFavorite) {
                        setFavorites([...favorites, { Id: id }]);
                    } else {
                        setFavorites(favorites.filter(favorite => favorite.Id !== id));
                    }
                }
            })
       }

    return (
        <main className="grid grid-cols-3 gap-4 min-h-screen p-24 bg-[#EFF4FF]">
            {data.map((bienImmo) => {

                    return (
                   <Card
                    key={bienImmo.Id}
                    title={bienImmo.Name}
                    address={bienImmo.PostalCode + " " + bienImmo.City}
                    src={bienImmo.Picture}
                    transports={bienImmo.Transports}
                    NbRoomsMin={bienImmo.NbRoomsMin}
                    NbRoomsMax={bienImmo.NbRoomsMax}
                    price={bienImmo.Price}
                    isFavorite={bienImmo.isFavorite}
                    pricePerMonth={parseFloat((bienImmo.Price / 12 / 30).toFixed(2))}
                    addToMyFavorites={() => handleAddToFavorites(bienImmo.Id)}
                />
               )
            }
            )}
        </main>
    );
}
