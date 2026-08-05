export const SelectTravelesList = [
    {
        id: 1,
        title: 'Just Me',
        desc: 'A sole traveles in exploration',
        icon: '✈️',
        people: '1'
    },
    {
        id: 2,
        title: 'A Couple',
        desc: 'Two traveles in tandem',
        icon: '🥂',
        people: '2 People'
    },
    {
        id: 3,
        title: 'Family',
        desc: 'A group of fun loving adv',
        icon: '🏡',
        people: '3 to 5 People'
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'A bunch of thrill-seekes',
        icon: '⛵',
        people: '5 to 10 People'
    },
]



const GroupSize = ({onselectOption}:any) => {

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center mt-3">
            {SelectTravelesList.map((item, id) => (
                <div key={id} className="p-3 border bg-white rounded-2xl cursor-pointer hover:border-primary flex flex-col items-center"
                onClick={()=>onselectOption(item.title)}>
                    <h2 className='text-2xl w-fit rounded-full'>{item.icon}</h2>
                    <h2 className="text-lg font-semibold mt-2">{item.title}</h2>
                </div>
            ))}
        </div>

    )
}

export default GroupSize
