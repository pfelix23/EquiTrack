import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import { csrfFetch } from "../../store/csrf";
import { Bar, Line} from 'react-chartjs-2';
import { useModal } from "../../context/Modal";
import NewLiabilityModal from "../NewLiabilityModal/NewLiabilityModal";
import EditLiabilityModal from "../EditLiabilityModal/EditLiabilityModal";
import DeleteAssetLiabilityModal from "../DeleteAssetLiabilityModal/DeleteAssetLiabilityModal";
import { Chart as ChartJS } from "chart.js/auto";
import './SingleLiabilityPage.css';
import { useParams } from "react-router-dom";

function SingleLiabilityPage() {
    const [liability, setLiability] = useState();
    const [assets, setAssets] = useState();
    const [liabilities, setLiabilities] = useState();
    const [errors, setErrors] = useState();
    const { closeModal, setModalContent } = useModal();
    const { liabilityId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        csrfFetch(`/api/liabilities/${liabilityId}`)
        .then(res => res.json())
        .then((data) => setLiability(data))
        .catch(async (res) => {
            const data = await res.json();
            if(data && data.errors) {
                setErrors(data.errors);
                console.error(errors)
            }
        })
    },[errors, closeModal, liabilityId])

    useEffect(() => {
        csrfFetch('/api/assets')
        .then(res => res.json())
        .then((data) => setAssets(data.Assets))
        .catch(async (res) => {
            const data = await res.json();
            if(data && data.errors) {
                setErrors(data.errors);
                console.error(errors)
            }
        })
    },[errors, closeModal, liabilityId])

    useEffect(() => {
        csrfFetch('/api/liabilities')
        .then(res => res.json())
        .then((data) => setLiabilities(data.Liabilities))
        .catch(async (res) => {
            const data = await res.json();
            if(data && data.errors) {
                setErrors(data.errors);
                console.error(errors)
            }
        })
    },[errors, closeModal, liabilityId]);

    
    const assetsTotal = assets?.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0);

    const liabilitiesTotal = liabilities?.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0);
    
    const liquidAssetsTotal = assets?.reduce((accumulator, currentValue) => accumulator + currentValue.liquid, 0);

    const liabilityData = {
        labels: [liability?.liability_name],
        datasets: [
            {
                label: 'Liability Amount',
                data: [liability?.amount],
                fill: false,
                tension: 0.1,
                backgroundColor:['#125943', '#112d66'],
                barThickness: 80,
                borderRadius: 12
            },
            {
                label: `${assetsTotal > liabilitiesTotal ? 'Net Assets' : 'Net Deficiency'}`,
                data: [`${assetsTotal > liabilitiesTotal ? assetsTotal - liabilitiesTotal : liabilitiesTotal - assetsTotal}`],
                fill: false,
                tension: 0.1,
                backgroundColor:['#112d66'],
                barThickness: 80,
                borderRadius: 12
            }
        ]
    };

    const investmentData = {
        labels: ["Ideal Debt to Asset", "Improve Debt to Asset", "Low Liquidity"],
        datasets: [
            {
                label: 'Debt Allocation',  
                data: [
                    (liabilitiesTotal / assetsTotal > .5 && liquidAssetsTotal > 0 ? liquidAssetsTotal: 5000 ) * 0.10,  
                    (liabilitiesTotal / assetsTotal > 0 && liabilitiesTotal / assetsTotal < .5 && liquidAssetsTotal > 0 ? liquidAssetsTotal: 5000 ) * 0.30,  
                    (assetsTotal - liabilitiesTotal < 0 && liquidAssetsTotal > 0 ? liquidAssetsTotal: 5000 ) * 0.50   
                ],
                fill: false,
                tension: 0.1,
                backgroundColor:'#125943'
            }
        ],
        
    };
    
   
    const options = {
        responsive: true,
      scales: {
        x: {
          barPercentage: 0.4,
          categoryPercentage: 0.8
        },
        y: {
          beginAtZero: true
        }       
      },
      plugins: {
          legend: {
              position: 'bottom'
          },
          tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  return `${liability.type}: $${tooltipItem.raw.toLocaleString()}`; 
                },
              },
            },
        }
    };

    const lineOptions = {
    responsive: true,
    scales: {
        x: {
            grid: {
                display: false, 
            },
            ticks: {
                autoSkip: false, 
            },
        },
        y: {
            beginAtZero: true,
            ticks: {
                callback: function(value) {
                    return `$${value.toLocaleString()}`; 
                }
            }
        }
    },
    plugins: {
        legend: {
            position: 'bottom', 
        },
        tooltip: {
            callbacks: {
                label: function (tooltipItem) {
                    return `${tooltipItem.dataset.label}: $${tooltipItem.raw.toLocaleString()}`;
                }
            }
        }
      }
    };

    const handleNewLiability = () => {
        setModalContent(<NewLiabilityModal closeModal={closeModal} />)
    };

    const handleEditLiability = (e) => {
        e.preventDefault();
        setModalContent(<EditLiabilityModal closeModal={closeModal} liability={liability}/>)
    };

    const handleDeleteLiability = (e) => {
        e.preventDefault();
        setModalContent(<DeleteAssetLiabilityModal liabilityId={liabilityId} closeModal={closeModal} navigate={navigate}/>)
    };

    useEffect(() => {

    },[ChartJS])
    
    
    return (
        <div className="single-root-liability-div">
            <div className="single-liability-parent-div">
            <button className="new-liability-button" onClick={handleNewLiability}><FaPlus /> &nbsp;New liability</button>
            <div className="liability-child-div">
                {liabilities?.map((liability) => {
                    return(<section id="liabilities" key={liability.id}> 
                        <p onClick={() => navigate(`/liabilities/${liability.id}`)}>{liability.liability_name}</p>
                        </section>
                    )
                })}
                </div>
            </div>
            {liabilities?.length > 0 && (
                    <div className="single-liability-chart-style">
                        <h1 className="h1">{liability?.liability_name} Information
                        <div>
                        <button className="single-liability-edit" onClick={handleEditLiability} >edit</button>
                        <button className="single-liability-delete" onClick={handleDeleteLiability} >delete</button>
                        </div>
                        </h1>
                        <div className="single-liability-container">
                        <div >
                        <div id="single-liability-div">{liability?.liability_name} Value & Net Asset Value</div>
                        <div className="single-liability-chart">
                        <Bar style={{paddingBottom: '10px'}} data={liabilityData} options={options}/>
                        </div>
                        </div>
                        <div >
                        <div id="single-liability-div"> Debt Repayment Strategy </div>
                        <div className="single-liability-chart">
                        <Line style={{paddingBottom: '10px'}} data={investmentData} options={lineOptions}/>
                        </div>
                        </div>
                        </div>                   
                    </div>
                )}
        </div>
    )
}

export default SingleLiabilityPage