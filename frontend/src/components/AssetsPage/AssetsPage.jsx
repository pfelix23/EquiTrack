import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import { csrfFetch } from "../../store/csrf";
import { Bar, Line, Doughnut, PolarArea } from 'react-chartjs-2';
import { useModal } from "../../context/Modal";
import NewAssetModal from "../NewAssetModal/NewAssetModal";
import { Chart as ChartJS } from "chart.js/auto";
import './AssetsPage.css'

function AssetsPage() {
    const [assets, setAssets] = useState();
    const [errors, setErrors] = useState();
    const { closeModal, setModalContent } = useModal();
    const navigate = useNavigate();

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
    },[errors, closeModal])

    const assetData = {
        labels: assets?.map(asset => asset.asset_name) ?? "Asset",
        datasets: [
            {
                label: 'assets',
                data: assets?.map(asset => asset.amount) ?? "Loading",
                fill: false,
                tension: 0.1,
                backgroundColor:'#125943'
            }
        ]
    };

   
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                const asset = assets[tooltipItem.dataIndex]; 
                return `${asset.type}: $${tooltipItem.raw}`; 
              },
            },
          },
        },
      };

    const handleNewAsset = (e) => {
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

    const investmentStrategy = () => {
        if(assets[0].net_assets && assets[0].net_assets < 10000) {
            return "Moderate"
        } else if(assets[0].net_assets && assets[0].net_assets > 10000) {
            return "Aggressive"
        } else return "Passive"
    }
      
    
    return (
        <div className="root-asset-div">
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
                        <h1 className="h1">Assets Information</h1>
                        <div>
                        <div id="asset-div">Asset Summary</div>
                        <div className="chart-asset-div">
                        <div className="trial-div">
                            <div>Total Assets</div>
                            <div >Net Value</div>
                            <div >{netLabel()}</div>
                            <div >Asset Types</div>
                            <div >Investment Strategy Recommendation</div>
                            <div >Mother</div>
                            <div >Mother</div>
                            <div >Mother</div>
                        </div>
                        <div className="trial-div">
                            <div>{assets.length}</div>
                            <div >${assetsTotal.toLocaleString()}</div>
                            <div >${netValue().toLocaleString()}</div>
                            <div >
                            <select style={{backgroundColor:'#e6e6e6)', color:'black'}}>
                            {assets.map((asset, index) => {
                                return (<option key={index} value="Types">{asset.type}</option>)
                                }
                              )
                            }
                            </select>
                            </div>
                            <div >{investmentStrategy()}</div>
                            <div >Mother</div>
                            <div >Mother</div>
                            <div >Mother</div>
                        </div>
                        </div>
                        </div>
                        <div>
                        <div id="asset-div">Asset Values</div>
                        <div className="assets-chart">
                        <Line data={assetData} options={options} />
                        </div>
                        </div>
                    </div>
                )}
        </div>
    )
}

export default AssetsPage