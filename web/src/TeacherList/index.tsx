import React, { FormEvent, useState } from 'react';

import api from '../services/api';
import Input from '../components/Input';
import PageHeader from '../components/PageHeader';
import Select from '../components/Select';
import TeacherItem, { Teacher } from '../../src/components/TeacherItem';

import './styles.css';



function TeacherList() {
    const [teachers, setTeachers] = useState([])

    const [ subject, setSubject ] = useState('')
    const [ week_day, setWeekDay ] = useState('')
    const [ time, setTime ] = useState('')


async function searchTeachers(e: FormEvent) {
    e.preventDefault()

    const response = await api.get('classes', {
        params: {
            subject,
            week_day,
            time,
        }
    })
    console.log(response.data)
}

    return (
        <div id="page-teacher-list" className="container">
            
            <PageHeader title="Estes são os Proffys disponíveis">
                <form id="search-teachers" onSubmit={searchTeachers}>                    
                    <Select 
                        name="subject" 
                        label="Matéria"
                        value={subject}
                        onChange={e => { setSubject(e.target.value) }}
                        options={[
                            { value: 'Artes', label: 'Artes' },
                            { value: 'Biologia', label: 'Biologia' },
                            { value: 'Ciências', label: 'Ciências' },
                            { value: 'Filosofia', label: 'Filosofia' },
                            { value: 'Física', label: 'Física' },
                            { value: 'Geografia', label: 'Geografia' },
                            { value: 'História', label: 'História' },
                            { value: 'Matemática', label: 'Matemática' },
                            { value: 'Português', label: 'Português' },
                            { value: 'Química', label: 'Química' },
                            { value: 'Música', label: 'Música' },
                        ]} 
                    /> 
                    <Select 
                        name="wee_day" 
                        label="Dia da semana"
                        value={week_day}
                        onChange={e => { setWeekDay(e.target.value) }}
                        options={[
                            { value: '0', label: 'Domingo' },
                            { value: '1', label: 'Segunda-feira' },
                            { value: '2', label: 'Terça-feira' },
                            { value: '3', label: 'Quarta-feira' },
                            { value: '4', label: 'Quinta-feira' },
                            { value: '5', label: 'Sexta-feira' },
                            { value: '6', label: 'Sábado' },
                        ]} 
                    />
                    <Input 
                        type="time" 
                        name="time" 
                        label="Hora"
                        value={time}
                        onChange={e => { setTime(e.target.value) }}
                    /> 

                    <button type='submit'>
                        Buscar    
                    </button>                   
                </form>
            </PageHeader>

            <main>
                {teachers.map((teacher: Teacher) => {
                    return <TeacherItem key={teacher.id} teacher={teacher}/>
                })}

                {/* <TeacherItem
                    name="Michele Silva" 
                    photo="data:image/jpeg;base64,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"
                    work="Ciências"
                    titleDescription="Há duas coisas infinitas: o Universo e a tolice dos Homens. Tudo aquilo que o homem ignora, não existe para ele."
                    bodyDescription="Em seu doutorado, a pesquisadora se especializou em geologia e vulcanologia planetária. 
                    Ela terminou o seu Ph.D. em ciência planetária em 2017 com uma tese que comparava os processos 
                    vulcânicos em Marte e na Terra. Depois disso, trabalhou por um tempo no Old Royal Observatory, em Greenwich."
                    price="R$ 80,00"
                />
                

                <TeacherItem
                    name="Machado de Assis"
                    photo="https://s1.static.brasilescola.uol.com.br/be/conteudo/images/machado-assis-tornou-se-um-dos-grandes-icones-literatura-nacional-5ba8cdbed5e33.jpg"
                    work="Português"
                    titleDescription="Mestre literário"
                    bodyDescription="Machado de Assis influenciou e influencia uma plêiade de escritores, sociólogos, historiadores, intelectuais em geral e artistas pelo Brasil e pelo mundo. 
                    Nomes como Olavo Bilac e Coelho Neto, Joaquim Francisco de Assis Brasil, Cyro dos Anjos, Lima Barreto "
                    price="R$ 50,00"
                />

                <TeacherItem
                    name="J.S. Bach"
                    photo="data:image/jpeg;base64,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"
                    work="Música"
                    titleDescription="Especialista em harmonias e arranjos"
                    bodyDescription="Sua habilidade ao órgão e ao cravo foi amplamente reconhecida enquanto viveu e se tornou lendária, 
                    sendo considerado o maior virtuoso de sua geração e um especialista na construção de órgãos. 
                    Também tinha grandes qualidades como maestro, cantor, professor e violinista, 
                    mas como compositor seu mérito só recebeu aprovação limitada e nunca foi exatamente popular, ainda que vários críticos que o conheceram o louvassem como grande."
                    price="R$ 30,00"
                />         */}
            </main>
            
        </div>
    )
}

export default TeacherList;