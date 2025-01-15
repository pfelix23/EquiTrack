import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import { csrfFetch } from "../../store/csrf";
import { Bar, Line, Doughnut, PolarArea } from 'react-chartjs-2';
import { useModal } from "../../context/Modal";
import NewInvestmentModal from "../NewInvestmentModal/NewInvestmentModal";
import { Chart as ChartJS } from "chart.js/auto";
import './InvestmentsPage.css'

function InvestmentsPage() {
    const [investments, setInvestments] = useState();
    const [errors, setErrors] = useState();
    const { closeModal, setModalContent } = useModal();
    const navigate = useNavigate();

    useEffect(() => {
        csrfFetch('/api/investments')
        .then(res => res.json())
        .then((data) => setInvestments(data.Investments))
        .catch(async (res) => {
            const data = await res.json();
            if(data && data.errors) {
                setErrors(data.errors);
                console.error(errors)
            }
        })
    },[errors, closeModal])

    const investmentData = {
        labels: investments?.map(investment => investment.investment_name),
        datasets: [
            {
                label: 'Investments',
                data: investments?.map(investment => investment.amount),
                fill: true,
                tension: 0.1,
                backgroundColor:'#125943'
            }
        ]
    };

    const RORData = {
        labels: investments?.map(investment => investment.investment_name),
        datasets: [
            {
                label: 'ROR',
                data: investments?.map(investment => investment.ROR),
                fill: false,
                tension: 0.1,
                backgroundColor:'#125943'
            }
        ]
    };

    const riskPercentageData = {
        labels: investments?.map(investment => investment.investment_name),
        datasets: [
            {
                label: 'Risk Percentage',
                data: investments?.map(investment => investment.risk_percentage),
                fill: false,
                tension: 0.1,
                backgroundColor:['#125943', '#112d66']
            }
        ]
    };

    const projectionData = {
        labels: investments?.map(investment => investment.investment_name),
        datasets: [
            {
                label: 'Projections',
                data: investments?.map(investment => investment.projection),
                fill: false,
                tension: 0.1,
                backgroundColor:['#125943', '#112d66']
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
                const investment = investments[tooltipItem.dataIndex]; 
                return `${investment.type}: $${tooltipItem.raw.toLocaleString()}`; 
              },
            },
          },
        },
      };

      const optionsPercentage = {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                const investment = investments[tooltipItem.dataIndex]; 
                return `${investment.type}: ${tooltipItem.raw}%`; 
              },
            },
          },
        },
      };

      const handleNewInvestment = () => {
    
        setModalContent(<NewInvestmentModal closeModal={closeModal}/>)
      }
      
    
    return (
        <div className="root-div">
            <div className="investment-parent-div">
            <button className="new-investment-button" onClick={handleNewInvestment}><FaPlus /> &nbsp;New Investment</button>
            <div className="investment-child-div">
                {investments?.map((investment) => {
                    return(<section id="investments" key={investment.id}> 
                        <p onClick={() => navigate(`/investments/${investment.id}`)}>{investment.investment_name}</p>
                        </section>
                    )
                })}
                </div>
            </div>
            {investments?.length > 0 && (
                    <div className="chart-style">
                        <div>
                        <div id="chart-div">Investment Amount</div>
                        <div className="chart">
                        <Bar data={investmentData} options={options}/>
                        </div>
                        </div>
                        <div>
                        <div id="chart-div"> Monthly ROR</div>
                        <div className="chart">
                        <Line data={RORData} options={optionsPercentage} />
                        </div>
                        </div>
                        <div>
                        <div id="chart-div">Investment Projection</div>
                        <div className="chart">
                        <Doughnut data={projectionData} options={options} />
                        </div>
                        </div>
                        <div>
                        <div id="chart-div">Risk Percentage</div>
                        <div className="chart">
                        <PolarArea data={riskPercentageData} options={optionsPercentage} />
                        </div>
                        </div>
                    </div>
                )}
        </div>
    )
}

export default InvestmentsPage