import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { csrfFetch } from "../../store/csrf";
import { Line } from 'react-chartjs-2';
import { useModal } from "../../context/Modal";
import NewAssetModal from "../NewAssetModal/NewAssetModal";
import { Chart as ChartJS } from "chart.js/auto";
import './AssetsPage.css'

function AssetsPage() {
    const [assets, setAssets] = useState();
    const [liabilities, setLiabilities] = useState();
    const [errors, setErrors] = useState();
    const { closeModal, setModalContent } = useModal();
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
    },[errors, closeModal, dispatch])

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
    },[errors, closeModal, dispatch])

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

    useEffect(() => {

    },[ChartJS])

   
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
                return `${asset.type}: $${(tooltipItem.raw.toLocaleString())}`; 
              },
            },
          },
        },
      };

    const handleNewAsset = () => {
        setModalContent(<NewAssetModal closeModal={closeModal}/>)
    }
    
    const assetsTotal = assets?.reduce((accumulator, currentValue) => accumulator + Number(currentValue.amount), 0);

    const liabilitiesTotal = liabilities?.reduce((accumulator, currentValue) => accumulator + Number(currentValue.amount), 0);

    const liquidAssetsTotal = assets?.reduce((accumulator, currentValue) => accumulator + Number(currentValue.liquid), 0);
    
    
    const netValue = () => {
    if(assetsTotal  > liabilitiesTotal) {
        return assetsTotal - liabilitiesTotal
    } else 
        return liabilitiesTotal - assetsTotal
    }

    const netLabel = () => {
        if(assetsTotal > liabilitiesTotal) return "Net Asset"
        else return "Net Deficiency"
    }

    const investmentStrategy = () => {
        if(assetsTotal - liabilitiesTotal > 0 && assetsTotal - liabilitiesTotal < 10000) {
            return "Moderate"
        } else if(assetsTotal - liabilitiesTotal > 10000) {
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
                    <div className="chart-asset-style">
                        <h1 className="h1-assets">Assets Summary</h1>
                        <div className="asset-container">
                        <div id="asset-div">Asset Information</div>
                        <div className="chart-asset-div">
                        <div className="trial-div">
                            <div className="trial-border" title="Total Number of Assets">Total Assets</div>
                            <div className="trial-border" title="Value of all Assets">Assets Value</div>
                            <div className="trial-border" title="Value of Assets minus Liabilities">{netLabel()} Value</div>
                            <div className="trial-border" title="All Types of Entered Assets">Asset Types</div>
                            <div className="trial-border" title="Recommended Investment Plan">Investment Strategy Recommendation</div>
                            <div className="trial-border" title="Value of all Liquid Assets">Liquid Assets</div>
                            <div className="trial-border" title="Proportion of your assets that are liquid.">Liquidity Ratio</div>
                            <div className="trial-bottom" title="Recommended Liquidity Ratio">Ideal Liquidity Ratio</div>
                        </div>
                        <div className="trial-div-1">
                            <div className="trial-border-1">{assets.length}</div>
                            <div className="trial-border-1">${assetsTotal.toLocaleString()}</div>
                            <div className="trial-border-1">${netValue().toLocaleString()}</div>
                            <div className="trial-border-1">
                            <select style={{backgroundColor:'#e6e6e6)', color:'black'}}>
                            {assets.map((asset, index) => {
                                return (<option key={index} value="Types">{asset.type}</option>)
                                }
                              )
                            }
                            </select>
                            </div>
                            <div className="trial-border-1">{investmentStrategy()}</div>
                            <div className="trial-border-1">${(typeof liquidAssetsTotal === 'number')? liquidAssetsTotal.toLocaleString() : 0}</div>
                            <div className="trial-border-1">{((liquidAssetsTotal/assetsTotal)*100).toFixed(2)}%</div>
                            <div className="trial-bottom">20% - 30%</div>
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