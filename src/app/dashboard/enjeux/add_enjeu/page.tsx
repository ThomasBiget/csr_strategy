"use client"
import { ChangeEvent, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import enjeux_data from '../../../../../data/esrs.json';


// typage des éléments envoyés en post à l'API
interface InputProps {
  label: string,
  color: string,
  pilier: string,
  esrs: string,
  business_impact: number,
  soc_en_impact: number,
}

export default function AddEnjeu() {


const piliers = Object.keys(enjeux_data);
const esrsEnvironnement = Object.keys(enjeux_data.Environnement);
let esrsList = []
let enjeuxList = []

const [selectedPilier, setSelectedPilier] = useState(piliers[0]);
const [esrs, setEsrs] = useState([]);
const [selectedEsrs, setSelectedEsrs] = useState(esrsEnvironnement[0]);
const [enjeux, setEnjeux] = useState([]);


useEffect(() => {
    esrsList = Object.keys(enjeux_data[selectedPilier])
    setEsrs(esrsList);
}, [selectedPilier]);

useEffect(() => {
    enjeuxList = Object.values(enjeux_data[selectedPilier][selectedEsrs])
    setEnjeux(enjeuxList);
}, [selectedEsrs]);
    
    const handleChangePilier = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedPilier(event.target.value);
    };

    const handleChangeEsrs = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedEsrs(event.target.value);
    };
  
  const { register, handleSubmit } = useForm<InputProps>()
  async function onSubmit (data: InputProps) {

    // on envoie un post vers l'API
    console.log(data);
      const response = await fetch('/api/enjeu/createEnjeu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const newEnjeu = await response.json();
      console.log(newEnjeu);
  };


  return (
  <div>
        <div className="flex flex-col items-center justify-between mb-3 mt-6">
          <h1 className="text-2xl font-bold lg:pt-0 text-center mb-16 text-green-400">Ajouter un enjeu</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
            {/* Pilier */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-[gray-700] text-xs font-bold mb-2" htmlFor="name">
                  Pilier
                </label>
                <select {...register("pilier")} onChange={handleChangePilier} name="pilier" className="appearance-none block w-full bg-[gray-200] text-[gray-700] border border-[gray-200] rounded py-3 px-4 mb-3 leading-tight">
                    {piliers.map((pilier, index) => (
                    <option key={index} value={pilier}>{pilier}</option>
                ))}
                    </select>
              </div>
            </div>
            {/* ESRS */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-[gray-700] text-xs font-bold mb-2" htmlFor="name">
                  ESRS
                </label>
                <select {...register("esrs")} onChange={handleChangeEsrs} name="esrs" className="appearance-none block w-full bg-[gray-200] text-[gray-700] border border-[gray-200] rounded py-3 px-4 mb-3 leading-tight">
                        {esrs.map((esrs, index) => (
                            <option key={index} value={esrs}>{esrs}</option>
                        ))}
                </select>
                </div>
            </div>
            {/* Enjeu */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-[gray-700] text-xs font-bold mb-2" htmlFor="email">
                  Enjeu
                </label>
                <select {...register("label")} name="enjeu" className="appearance-none block w-full bg-[gray-200] text-[gray-700] border border-[gray-200] rounded py-3 px-4 mb-3 leading-tight">
                        {enjeux.map((enjeu, index) => (
                            <option key={index} value={enjeu}>{enjeu}</option>
                        ))}
                </select>
              </div>
            </div>
            {/* Note d'impact sur l'activité de l'entreprise */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 relative">
                <label className="block uppercase tracking-wide text-[gray-700] text-xs font-bold mb-2" htmlFor="password">
                Note d&apos;impact sur l&apos; activité de l&apos;entreprise
                </label>
                <input type="number" {...register("business_impact")} required name="password" className="appearance-none block w-full bg-[gray-200] text-[gray-700] border border-[gray-200] rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-[white] focus:border-[gray-500]" placeholder="Saisir une note de 0 à 10" />
              </div>
            </div>
            {/* Note d'impact sur l'environnement et le social */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 relative">
                <label className="block uppercase tracking-wide text-[gray-700] text-xs font-bold mb-2" htmlFor="passwordConfirm">
                Note d&apos;impact sur l&apos;environnement et le social
                </label>
                <input type="number" {...register("soc_en_impact")} required name="Note d'impact sur l'entreprise" className="appearance-none block w-full bg-[gray-200] text-[gray-700] border border-[gray-200] rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-[white] focus:border-[gray-500]" placeholder="Saisir une note de 0 à 10" />
              </div>
            </div>
            {/* boutton soumission */}
            <div className="md:flex md:items-center">
              <div className="md:w-1/3">
                <button className="cursor-pointer transition-all 
                    bg-green-400 text-gray-800 px-6 py-2 rounded-lg
                    border-gray-700
                    border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                    active:border-b-[2px] active:brightness-90 active:translate-y-[2px] hover:shadow-xl hover:shadow-gray-400 shadow-gray-400 active:shadow-none" type="submit">
                  Ajouter l&apos;enjeu
                </button>
              </div>
              <div className="md:w-2/3" />
            </div>
          </form>
        </div>
        </div>
  );
}
