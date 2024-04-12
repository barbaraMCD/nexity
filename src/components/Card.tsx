import Image, {StaticImageData} from "next/image";
import housePicture from '../../public/housePicture.jpg'
import { Home, DollarSign, Database, MapPin, Heart } from 'react-feather';
import ContentBox from "@/components/Content";
import {Transports} from "@/app/page";


interface CardProps {
    title: string;
    address: string;
    src?: string | StaticImageData;
    NbRoomsMin: number;
    NbRoomsMax: number;
    transports: Transports[];
    price: number;
    pricePerMonth?: number;
    addToMyFavorites: () => void;
    isFavorite: boolean;
}
const Card = ({ title, address, src, NbRoomsMin, NbRoomsMax, transports, price, pricePerMonth, addToMyFavorites, isFavorite }: CardProps) => {

    const transportsMapping = transports.map((transport, index) => {
        console.log(transport.ligne)
        return (
            <span className={"ml-1"} key={index}>{transport.ligne}</span>
        )})

    return (
<div className="bg-white rounded-md w-fit border-[#EAEEF9] border-solid border-2 flex flex-row p-4">
    <div className={"w-1/2"}>
        <Image src={housePicture} alt={"HousePicture"} className={"rounded-md"}/>
    </div>
    <div className={"w-1/2 ml-2"}>
        <h2 className="text-xl font-semibold text-[#0E215C]">
            {title}
        </h2>
        <p className="text-[#849CD9]">
            {address}
        </p>
        <ContentBox icon={<MapPin size={18} className="text-[#EC1D1D]"/>}>
            <p className="text-[#0E215C] ml-1">
                {transports.length > 0 ?
                    transportsMapping
                        :
                    <span> / </span>
                }
            </p>
        </ContentBox>
        <ContentBox icon={<Home size={18} className="text-[#EC1D1D]"/>}>
            <p className="text-[#0E215C] ml-1">
                {NbRoomsMax === NbRoomsMin ? `${NbRoomsMin} pièces` : `${NbRoomsMin} à ${NbRoomsMax} pièces`}
            </p>
        </ContentBox>
        <ContentBox icon={<DollarSign size={18} className="text-[#EC1D1D]"/>}>
            <p className="text-[#0E215C] ml-1 flex flex-row">
                <p className="text-[#849CD9] mr-1"> à partir de </p>
                {price} €
            </p>
        </ContentBox>
        <ContentBox icon={<Database size={18} className="text-[#3679FF]"/>}>
            <p className="text-[#3679FF] ml-1 font-semibold">
                soit {pricePerMonth} €/mois
            </p>
        </ContentBox>
        <div className={"flex flex-row items-center gap-2"}>
            <p className={"text-[#EC1D1D]"}> Ajouter à mes favoris </p>
            <Heart size={18} className="text-[#EC1D1D]" onClick={addToMyFavorites} style={isFavorite ? {color: "blue"} : {}}/>
        </div>
    </div>
</div>
    )
}

export default Card;
