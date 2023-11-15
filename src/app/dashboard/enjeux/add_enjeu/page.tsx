"use client"
import { ChangeEvent, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSession } from "next-auth/react"


// typage des éléments envoyés en post à l'API
interface InputProps {
  pilier: string,
  esrs: string,
  label: string,
  business_impact: string,
  soc_en_impact: string,
}
const enjeux_data = require('../../../../../data/esrs.json');

const noteArray = ["10", "9", "8", "7", "6", "5", "4", "3", "2", "1"];

export default function AddEnjeu() {

const { data: session } = useSession()
const piliers = Object.keys(enjeux_data);
const esrsEnv = Object.keys(enjeux_data[piliers[0]]);

// const [selectedPilier, setSelectedPilier] = useState<string>(piliers[0]);
const [esrsList, setEsrsList] = useState<string[]>([]);
// const [selectedEsrs, setSelectedEsrs] = useState<string>(esrsEnv[0]);
const [enjeuxList, setEnjeuxList] = useState<string[]>([]);

// useEffect(() => {
//   const esrsList = Object.keys(enjeux_data[selectedPilier]);
//     setEsrs(esrsList);
//     setSelectedEsrs(esrsList[0]);
// }, [selectedPilier]);
  
  const { register, handleSubmit, watch, setValue} = useForm<InputProps>({
    defaultValues: {
      pilier: '',
      esrs: '',
      label: '',
      business_impact: '',
      soc_en_impact: ''
    }
  })

  const pilier = watch('pilier')

  useEffect(() => {
    if (enjeux_data[pilier]) {
    const list = Object.keys(enjeux_data[pilier])
    setEsrsList(list)
    }
  }, [pilier])

  const esrs = watch('esrs')
  
useEffect(() => {
  // On s'assure que enjeux_data[selectedPilier] est un objet valide avant d'essayer d'obtenir ses valeurs.
  if (enjeux_data[pilier]) {
  const esrsObject = enjeux_data[pilier][esrs];
  if (esrsObject) {
    const list = Object.values(esrsObject) as string[];
    setEnjeuxList(list);
  } else {
    // On gère le cas où esrsObject est undefined.
    console.error('esrs non trouvé dans enjeux_data[pilier]', esrs);
    setEnjeuxList([]);
  }
  } else {
  // on gère le cas où enjeux_data[pilier] est undefined.
  console.error('pilier non trouvé dans enjeux_data', pilier);
  setEsrsList([]);
  setEnjeuxList([]);
  }
}, [esrs, pilier]);

const label = watch('label')
const business_impact = watch('business_impact')
const soc_en_impact = watch('soc_en_impact')

  async function onSubmit (data: InputProps) {
    console.log(data)
    let color = ''
    if (data.pilier === 'Environnement') {
        color = '#32a852'
    } else if (data.pilier === 'Social') {
        color = '#3073ba'
    } else if (data.pilier === 'Gouvernance') {
        color = '#d1963d'
    }   

    const enjeuCreated = {
      label: data.label,
      color,
      pilier: data.pilier,
      esrs: data.esrs,
      business_impact: data.business_impact,
      soc_en_impact: data.soc_en_impact,
      authorId: session?.user?.id,
    }
    // on envoie un post vers l'API
    console.log(enjeuCreated);
      const response = await fetch('/api/enjeu/createEnjeu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(enjeuCreated),
      });
      console.log(JSON.stringify(enjeuCreated));
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
                  <select {...register("pilier", { maxLength: 200 })} className="appearance-none block w-full bg-[gray-200] text-[gray-700] border border-[gray-200] rounded py-3 px-4 mb-3 leading-tight"> 
                    {pilier === '' &&
                    <option value='' disabled hidden>Choisissez un pilier</option>}
                    {piliers.map((pilier, index) => (
                    <option key={index} value={pilier}>{pilier}</option>
                ))}
                    </select>
              </div>
            </div>
            {/* ESRS */}
          {pilier !== '' &&
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-[gray-700] text-xs font-bold mb-2" htmlFor="name">
                  ESRS
                </label>
                <select {...register("esrs", { maxLength: 200 })} className="appearance-none block w-full bg-[gray-200] text-[gray-700] border border-[gray-200] rounded py-3 px-4 mb-3 leading-tight">
                    {esrs === '' &&
                        <option value='' disabled hidden>Choisissez un ESRS</option>}
                        {esrsList.map((esrs, index) => (
                        <option key={index} value={esrs}>{esrs}</option>
                        ))}
                </select>
                </div>
            </div>
            }
            {/* Enjeu */}
            { esrs !== '' &&
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-[gray-700] text-xs font-bold mb-2" htmlFor="email">
                  Enjeu
                </label>
                <select {...register("label", { maxLength: 200 })} name="label" className="appearance-none block w-full bg-[gray-200] text-[gray-700] border border-[gray-200] rounded py-3 px-4 mb-3 leading-tight">
                        {label === '' &&
                        <option value='' disabled hidden>Choisissez un enjeu</option>}
                        {enjeuxList.map((enjeu, index) => (
                            <option key={index} value={enjeu}>{enjeu}</option>
                        ))}
                </select>
              </div>
            </div>
            }
            {/* Note d'impact sur l'activité de l'entreprise */}
            { label !== '' &&
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 relative">
                <label className="block uppercase tracking-wide text-[gray-700] text-xs font-bold mb-2" htmlFor="password">
                Note d&apos;impact sur l&apos; activité de l&apos;entreprise
                </label>
                <select {...register("business_impact")} name="Note d'impact sur l'entreprise" className="appearance-none block w-full bg-[gray-200] text-[gray-700] border border-[gray-200] rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-[white] focus:border-[gray-500]" placeholder="Sélectionner une note de 0 à 10">
                        {business_impact === '' &&
                        <option value='' disabled hidden>Notez de 0 à 10</option>}
                          { 
                            noteArray.map((note, index) => (
                              <option key={index} value={note} onClick={() => setValue("business_impact", note)}>{note}</option>
                            ))
                          }
                          </select>
              </div>
            </div>
            }
            {/* Note d'impact sur l'environnement et le social */}
            { business_impact !== '' &&
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 relative">
                <label className="block uppercase tracking-wide text-[gray-700] text-xs font-bold mb-2" htmlFor="passwordConfirm">
                Note d&apos;impact sur l&apos;environnement et le social
                </label>
                <select {...register("soc_en_impact")} name="Note d'impact sur l'entreprise" className="appearance-none block w-full bg-[gray-200] text-[gray-700] border border-[gray-200] rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-[white] focus:border-[gray-500]" placeholder="Sélectionner une note de 0 à 10" >
                          {soc_en_impact === '' &&
                          <option value='' disabled hidden>Notez de 0 à 10</option>}
                            { 
                            noteArray.map((note, index) => (
                              <option key={index} value={note} onClick={() => setValue("soc_en_impact", note)}>{note}</option>
                            ))
                          }
                          </select>
              </div>
            </div>
            }
            {/* boutton soumission */}
            { soc_en_impact !== '' &&
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
            }
          </form>
        </div>
        </div>
  );
}
