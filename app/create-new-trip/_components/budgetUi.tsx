export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Cheap',
        desc: 'Stay conscious of costs',
        icon: '💵',
        color: 'bg-green-100 text-green-600'
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Keep cost on the average side',
        icon: '💰',
        color: 'bg-yellow-100 text-yellow-600'
    },
    {
        id: 3,
        title: 'Luxury',
        desc: 'Don’t worry about cost',
        icon: '💸',
        color: 'bg-purple-100 text-purple-600'
    },

]

const BudgetUi = ({onselectOption}:any) => {

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-center mt-3">
            {SelectBudgetOptions.map((item, id) => (
                <div key={id} className="p-3 border bg-white rounded-2xl cursor-pointer hover:border-primary flex flex-col items-center"
                onClick={()=>onselectOption(item.title)}>
                    <h2 className={`text-3xl p-3 w-fit rounded-full ${item.color}`}>{item.icon}</h2>
                    <h2 className="text-lg font-semibold mt-2">{item.title}</h2>
                    <h2 className="text-gray-400 text-sm">{item.desc}</h2>
                </div>
            ))}
        </div>

    )
}

export default BudgetUi
