import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import { csrfFetch } from "../../store/csrf";
import { Bar, Line, Doughnut, PolarArea } from 'react-chartjs-2';
import { useModal } from "../../context/Modal";
import NewAssetModal from "../NewAssetModal/NewAssetModal";
import { Chart as ChartJS } from "chart.js/auto";
import './SingleAssetPage.css';
import { useParams } from "react-router-dom";

function SingleAssetPage() {
    const [asset, setAsset] = useState();
    const [assets, setAssets] = useState();
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

    const assetData = {
        labels: [asset?.asset_name],
        datasets: [
            {
                label: 'Asset Amount',
                data: [asset?.amount],
                fill: false,
                tension: 0.1,
                backgroundColor:['#125943', '#112d66'],
                barThickness: 80
            },
            {
                label: `${asset?.net_assets ? 'Net Assets' : 'Net Deficiency'}`,
                data: [`${asset?.net_assets ? asset?.net_assets : asset?.net_deficiency}`],
                fill: false,
                tension: 0.1,
                backgroundColor:['#112d66'],
                barThickness: 80
            }
        ]
    };

    const investmentData = {
        labels: ["Passive", "Moderate", "Aggressive"],
        datasets: [
            {
                label: 'Investment Allocation',  
                data: [
                    (asset?.net_assets) * 0.10,  
                    (asset?.net_assets) * 0.30,  
                    (asset?.net_assets) * 0.50   
                ],
                fill: false,
                tension: 0.1,
                 backgroundColor:'#125943'
                // pointBackgroundColor: '#112d66',  
                // pointRadius: 5,  
                // pointBorderWidth: 2
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
                  const asset = assets[tooltipItem.dataIndex]; 
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
                    maxRotation: 0,  
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
    }
    
    const assetsTotal = assets?.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0);
    
   const netValue = () => {
    if(assets[0].net_assets) {
        return assets[0].net_assets
    } else 
        return assets[0].net_deficiency
    }

    const netLabel = () => {
        if(assets[0].net_assets) return "Net Assets"
        else return "Net Deficiency"
    }
      
    
    return (
        <div className="single-root-asset-div">
            <div className="asset-parent-div">
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
                    <div className="chart-style">
                        <h1 className="h1">{asset?.asset_name} Information
                        <div>
                        <button className="single-asset-edit" >edit</button>
                        <button className="single-asset-delete" >delete</button>
                        </div>
                        </h1>
                        <div className="single-asset-container">
                        <div className="single-asset">
                        <div id="single-asset-div">{asset?.asset_name} Value</div>
                        <Bar style={{paddingBottom: '10px'}} data={assetData} options={options}/>
                        </div>
                        <div className="single-asset">
                        <div id="single-asset-div">{asset?.asset_name} Monthly Return & Risk-Percentage</div>
                        <Line style={{paddingBottom: '10px'}} data={investmentData} options={lineOptions}/>
                        </div>
                        </div>                   
                    </div>
                )}
        </div>
    )
}

export default SingleAssetPage