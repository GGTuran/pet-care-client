

const milestones = [
    { date: '2010', title: 'Founded', description: 'Started our journey with the vision of providing the best bike rental experience.' },
    { date: '2012', title: 'Expanded Fleet', description: 'Increased our fleet size to include a variety of bikes for every need.' },
    { date: '2015', title: 'New Location', description: 'Opened a new location to serve more customers across the city.' },
    { date: '2018', title: 'Online Booking', description: 'Launched our online booking system for a seamless rental experience.' },
    { date: '2020', title: 'Sustainability Initiative', description: 'Introduced eco-friendly bikes and green practices in our operations.' },
    { date: '2023', title: 'Award Winning', description: 'Received the award for Best Bike Rental Service in the region.' },
];

const HistoryMilestones = () => {
    return (
        <section className=" py-12">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-8">History & Milestones</h2>
                <div className="relative">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full border-l-2 border-gray-300"></div>
                    <ul className="space-y-8">
                        {milestones.map((milestone, index) => (
                            <li key={index} className="relative">
                                <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-primary rounded-full border-2 border-white"></div>
                                <div className="ml-6">
                                    <p className="text-lg font-semibold text-primary">{milestone.date}</p>
                                    <h3 className="text-xl font-bold ">{milestone.title}</h3>
                                    <p className="">{milestone.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default HistoryMilestones;
