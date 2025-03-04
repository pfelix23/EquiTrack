import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { csrfFetch } from "../../store/csrf";
import { Line } from 'react-chartjs-2';
import { useModal } from "../../context/Modal";
import NewLiabilityModal from "../NewLiabilityModal/NewLiabilityModal";
import { Chart as ChartJS } from "chart.js/auto";
import './LiabilitiesPage.css'

function LiabilitiesPage() {
    const [assets, setAssets] = useState();
    const [liabilities, setLiabilities] = useState();
    const [errors, setErrors] = useState();
    const { closeModal, setModalContent } = useModal();
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
    },[errors, closeModal, dispatch]);

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


    const liabilityData = {
        labels: liabilities?.map(liability => liability.liability_name) ?? "Liability",
        datasets: [
            {
                label: 'liabilities',
                data: liabilities?.map(liability => liability.amount) ?? "Loading",
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
                const liability = liabilities[tooltipItem.dataIndex]; 
                return `${liability.type}: $${(tooltipItem.raw)}`; 
              },
            },
          },
        },
      };

    const handleNewLiability = () => {
        setModalContent(<NewLiabilityModal closeModal={closeModal}/>)
    }
    
    const assetsTotal = assets?.reduce((accumulator, currentValue) => accumulator + Number(currentValue.amount), 0);

    const liabilitiesTotal = liabilities?.reduce((accumulator, currentValue) => accumulator + Number(currentValue.amount), 0);

    const liquidAssetsTotal = assets?.reduce((accumulator, currentValue) => accumulator + Number(currentValue.liquid), 0);
    

    const netValue = () => {
    if(assetsTotal  > liabilitiesTotal ) {
        return assetsTotal - liabilitiesTotal
    } else 
        return liabilitiesTotal - assetsTotal
    }

    const netLabel = () => {
        if(assetsTotal > liabilitiesTotal) return "Net Asset"
        else return "Net Deficiency"
    }

    const debtRepaymentStrategy = () => {
        if(liabilitiesTotal / assetsTotal > 0 && liabilitiesTotal / assetsTotal > .1 && liabilitiesTotal / assetsTotal < .5 && liquidAssetsTotal > 0) {
            return "Moderate"
        } else if(assetsTotal - liabilitiesTotal < 0 && liquidAssetsTotal > 0) {
            return "Aggressive"
        } else return "Passive"
    };

    useEffect(() => {

    },[ChartJS])
    
    return (
        <div className="root-liability-div">
            <div className="liability-parent-div">
            <button className="new-liability-button" onClick={handleNewLiability}><FaPlus /> &nbsp;New Liability</button>
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
                    <div className="chart-liability-style">
                        <h1 className="h1-liabilities">Liabilities Summary</h1>
                        <div className="liability-container">
                        <div id="liability-div">Liability Information</div>
                        <div className="chart-liability-div">
                        <div className="liability-trial-div">
                            <div className="liability-trial-border" title="Total Number of Liabilities">Total Liabilities</div>
                            <div className="liability-trial-border" title="Value of all Liabilities">Liabilities Value</div>
                            <div className="liability-trial-border" title="Value of Assets minus Liabilities">{netLabel()} Value</div>
                            <div className="liability-trial-border" title="All Types of Entered Liabilities">Liability Types</div>
                            <div className="liability-trial-border" title="Recommended Debt Repayment Plan">Debt Repayment Strategy</div>
                            <div className="liability-trial-border" title="Value of all Liquid Assets">Liquid Assets</div>
                            <div className="liability-trial-border" title="Value of Liabilities divided by Assets">Debt to Asset Ratio</div>
                            <div className="liability-trial-bottom" title="Recommended Debt Ratio">Ideal Debt Ratio</div>
                        </div>
                        <div className="liability-trial-div-1">
                            <div className="liability-trial-border-1">{liabilities.length}</div>
                            <div className="liability-trial-border-1">${liabilitiesTotal.toLocaleString() }</div>
                            <div className="liability-trial-border-1">${netValue().toLocaleString() }</div>
                            <div className="liability-trial-border-1">
                            <select style={{backgroundColor:'#e6e6e6)', color:'black'}}>
                            {liabilities.map((liability, index) => {
                                return (<option key={index} value="Types">{liability.type}</option>)
                                }
                              )
                            }
                            </select>
                            </div>
                            <div className="liability-trial-border-1">{debtRepaymentStrategy()}</div>
                            <div className="liability-trial-border-1">${(typeof liquidAssetsTotal === 'number')? liquidAssetsTotal.toLocaleString() : 0}</div>
                            <div className="liability-trial-border-1">{((liabilitiesTotal/assetsTotal)*100).toFixed(2)}%</div>
                            <div className="liability-trial-bottom">10% - 50%</div>
                        </div>
                        </div>
                        </div>
                        <div>
                        <div id="liability-div">Liability Values</div>
                        <div className="liabilities-chart">
                        <Line data={liabilityData} options={options} />
                        </div>
                        </div>
                    </div>
                )}
        </div>
    )
}

export default LiabilitiesPage