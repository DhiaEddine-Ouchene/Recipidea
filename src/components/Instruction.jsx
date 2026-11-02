

export default function Instruction({children , instructionNbr}){

    return(
        <div className="flex items-start gap-4 group ">
            <div className="text-primary group-hover:text-white group-hover:bg-primary bg-surface-container rounded-full font-bold shrink-0  flex items-center justify-center text-xl h-10 w-10 " >{instructionNbr}</div>
            <div className="text-on-surface-variant ">
                {children}
            </div>
        </div>
    )
}