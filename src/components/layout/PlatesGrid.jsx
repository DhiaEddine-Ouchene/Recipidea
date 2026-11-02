

export default function PlatesGrid({children}){
    return(
        <div className="grid  gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
            {children}
        </div>
    )
}