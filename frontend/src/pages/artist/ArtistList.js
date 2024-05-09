import { Artist } from "../../components/Artist";
export const ArtistList = ({ artists }) => {
    return (
        <div className="grid grid-row-auto xl:grid-cols-3 grid-cols-2 items-start cursor-pointer justify-center  gap-4 sm:gap-[30px] my-[20px] ">
            {artists.map((artist) => {
               
                return (
                    <Artist artist={artist}/>
                );
            })}
        </div>
    );
};
