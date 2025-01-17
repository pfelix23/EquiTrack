import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { csrfFetch } from "../../store/csrf";
import { useModal } from "../../context/Modal";
import { Bar } from 'react-chartjs-2';
import NewInvestmentModal from "../NewInvestmentModal/NewInvestmentModal";
import EditInvestmentModal from "../EditInvestmentModal/EditInvestmentModal";
import DeleteUserInvestmentModal from "../DeleteUserInvestmentModal/DeleteUserInvestmentModal";
import './SingleInvestmentPage.css'

function SingleInvestmentPage() {
    const [investment, setInvestment] = useState();
    const [investments, setInvestments] = useState();
    const [errors, setErrors] = useState();
    const { setModalContent, closeModal } = useModal();
    const { investmentId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        csrfFetch(`/api/investments/${investmentId}`)
        .then(res => res.json())
        .then(data => setInvestment(data))
        .catch( async (res) => {
            const data = res.json();
            if(data && data.errors) {
                setErrors(data.errors);
                console.error(errors)
            }
        })
    },[errors, closeModal, investmentId]);

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
    },[errors, closeModal, investmentId]);

    const dollarData = {
        labels: [investment?.investment_name],
        datasets: [
            {
                label: 'Investment',
                data: [investment?.amount],
                fill: false,
                tension: 0.1,
                backgroundColor:['#125943', '#112d66'],
                barThickness: 80,
                borderRadius: 12
            },
            {
                label: 'Projection',
                data: [investment?.projection],
                fill: false,
                tension: 0.1,
                backgroundColor:['#112d66'],
                barThickness: 80,
                borderRadius: 12
            }
        ]
    };

    const percentageData = {
        labels: [investment?.investment_name],
        datasets: [
            {
                label: 'Monthly Return',
                data: [investment?.ROR],
                fill: false,
                tension: 0.1,
                backgroundColor: ['#112d66'],
                grouped: true,
                barThickness: 80,
                borderRadius: 12
            },
            {
                label: 'Risk Percentage',
                data: [investment?.risk_percentage],
                fill: false,
                tension: 0.1,
                backgroundColor:['#125943', '#112d66'],
                grouped: true,
                barThickness: 80,
                borderRadius: 12
            },
        ]
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
                  return `${investment.type}: $${tooltipItem.raw.toLocaleString()}`; 
                },
              },
            },
        }
      };

    const percentageOptions = {
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
                  return `${investment.type}: ${tooltipItem.raw}%`; 
                },
              },
            },
        }
      };

    const handleNewInvestment = (e) => {
      e.preventDefault();
      setModalContent(<NewInvestmentModal closeModal={closeModal}/>)
    }

    const handleDeleteInvestment = (e) => {
      e.preventDefault();
      setModalContent(<DeleteUserInvestmentModal investmentId={investmentId} closeModal={closeModal} navigate={navigate}/>)
    }

    const handleEditInvestment = (e) => {
      e.preventDefault();
      setModalContent(<EditInvestmentModal closeModal={closeModal} investment={investment}/>)
    }



    return (
        <div className="single-root-div">
            <div className="single-investment-parent-div">
            <div className="new-investment-button" onClick={handleNewInvestment}><FaPlus /> &nbsp;New Investment </div>
            <div className="single-investment-child-div">
                {investments?.map((investment) => {
                    return(<section id="investments" key={investment.id}> 
                        <p onClick={() => navigate(`/investments/${investment.id}`)}>{investment.investment_name}</p>
                        </section>
                    )
                })}
                </div>
            </div>
            {investment?.length > 0 && (
                    <div className="single-chart-style">
                      <h1 className="h1">{investment.investment_name} Information
                        <div>
                        <button className="single-investment-edit" onClick={handleEditInvestment}>edit</button>
                        <button className="single-investment-delete" onClick={handleDeleteInvestment}>delete</button>
                        </div>
                      </h1>
                        <div className="single-chart-container">
                        <div >
                        <div id="single-chart-div">{investment.investment_name} Amount & Projections</div>
                        <div className="single-investment-chart">
                        <Bar style={{paddingBottom: '10px'}} data={dollarData} options={options}/>
                        </div>
                        </div>
                        <div >
                        <div id="single-chart-div">{investment.investment_name} Monthly Return & Risk-Percentage</div>
                        <div className="single-investment-chart">
                        <Bar style={{paddingBottom: '10px'}} data={percentageData} options={percentageOptions}/>
                        </div>
                        </div>
                        </div>                        
                    </div>
                )}
        </div>
    );
}

export default SingleInvestmentPage;