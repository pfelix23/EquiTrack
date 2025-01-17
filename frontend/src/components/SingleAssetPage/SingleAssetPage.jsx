import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import { csrfFetch } from "../../store/csrf";
import { Bar, Line} from 'react-chartjs-2';
import { useModal } from "../../context/Modal";
import NewAssetModal from "../NewAssetModal/NewAssetModal";
import EditAssetModal from "../EditAssetModal/EditAssetModal";
import DeleteAssetLiabilityModal from "../DeleteAssetLiabilityModal/DeleteAssetLiabilityModal";
import { Chart as ChartJS } from "chart.js/auto";
import './SingleAssetPage.css';
import { useParams } from "react-router-dom";

function SingleAssetPage() {
    const [asset, setAsset] = useState();
    const [assets, setAssets] = useState();
    const [liabilities, setLiabilities] = useState();
    const [errors, setErrors] = useState();
    const { closeModal, setModalContent } = useModal();
    const { assetId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        csrfFetch(`/api/assets/${assetId}`)
        .then(res => res.json())
        .then((data) => setAsset(data))
        .catch(async (res) => {
            const data = await res.json();
            if(data && data.errors) {
                setErrors(data.errors);
                console.error(errors)
            }
        })
    },[errors, closeModal, assetId])

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
    },[errors, closeModal, assetId])

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
    },[errors, closeModal, assetId]);

    
    const assetsTotal = assets?.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0);

    const liabilitiesTotal = liabilities?.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0);
    
    const liquidAssetsTotal = assets?.reduce((accumulator, currentValue) => accumulator + currentValue.liquid, 0);

    const assetData = {
        labels: [asset?.asset_name],
        datasets: [
            {
                label: 'Asset Amount',
                data: [asset?.amount],
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
        labels: ["Passive", "Moderate", "Aggressive"],
        datasets: [
            {
                label: 'Investment Allocation',  
                data: [
                    (assetsTotal - liabilitiesTotal > 0 && liquidAssetsTotal > 0 ? liquidAssetsTotal: 5000 ) * 0.10,  
                    (assetsTotal - liabilitiesTotal > 0 && liquidAssetsTotal > 0 ? liquidAssetsTotal: 5000 ) * 0.30,  
                    (assetsTotal - liabilitiesTotal > 0 && liquidAssetsTotal > 0 ? liquidAssetsTotal: 5000 ) * 0.50   
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
                  return `${asset.type}: $${tooltipItem.raw.toLocaleString()}`; 
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

    const handleNewAsset = () => {
        setModalContent(<NewAssetModal closeModal={closeModal}/>)
    };

    const handleEditAsset = (e) => {
        e.preventDefault();
        setModalContent(<EditAssetModal closeModal={closeModal} asset={asset}/>)
    };

    const handleDeleteAsset = (e) => {
        e.preventDefault();
        setModalContent(<DeleteAssetLiabilityModal assetId={assetId} closeModal={closeModal} navigate={navigate}/>)
    };

    const netLabel = () => {
        if(assetsTotal > liabilitiesTotal) return "Net Asset"
        else return "Net Deficiency"
    }
    
    
    return (
        <div className="single-root-asset-div">
            <div className="single-asset-parent-div">
            <button className="new-asset-button" onClick={handleNewAsset}><FaPlus /> &nbsp;New Asset</button>
            <div className="asset-child-div">
                {assets?.map((asset) => {
                    return(<section id="assets" key={asset.id}> 
                        <p onClick={() => navigate(`/assets/${asset.id}`)}>{asset.asset_name}</p>
                        </section>
                    )
                })}
                </div>
            </div>
            {assets?.length > 0 && (
                    <div className="single-asset-chart-style">
                        <h1 className="h1">{asset?.asset_name} Information
                        <div>
                        <button className="single-asset-edit" onClick={handleEditAsset} >edit</button>
                        <button className="single-asset-delete" onClick={handleDeleteAsset} >delete</button>
                        </div>
                        </h1>
                        <div className="single-asset-container">
                        <div >
                        <div id="single-asset-div">{asset?.asset_name} Value &  {netLabel()} Value</div>
                        <div className="single-asset-chart">
                        <Bar style={{paddingBottom: '10px'}} data={assetData} options={options}/>
                        </div>
                        </div>
                        <div >
                        <div id="single-asset-div"> Investment Strategies </div>
                        <div className="single-asset-chart">
                        <Line style={{paddingBottom: '10px'}} data={investmentData} options={lineOptions}/>
                        </div>
                        </div>
                        </div>                   
                    </div>
                )}
        </div>
    )
}

export default SingleAssetPage