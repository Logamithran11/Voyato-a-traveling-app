
'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Languages, Mic, Volume2, Copy, Repeat, Star } from 'lucide-react';
import Link from 'next/link';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const languages = [
  { value: "en", label: "English" },
  { value: "hi", label: "Hindi" },
  { value: "ta", label: "Tamil" },
  { value: "bn", label: "Bengali" },
  { value: "te", label: "Telugu" },
  { value: "mr", label: "Marathi" },
  { value: "gu", label: "Gujarati" },
];

export default function TranslatorPage() {
    const [fromLang, setFromLang] = useState("en");
    const [toLang, setToLang] = useState("hi");
    const [inputText, setInputText] = useState("Where is the nearest hospital?");
    const [outputText, setOutputText] = useState("नजदीकी अस्पताल कहाँ है?");
    const [isRecording, setIsRecording] = useState(false);
    const { toast } = useToast();

    const handleSwitchLanguages = () => {
        setFromLang(toLang);
        setToLang(fromLang);
        setInputText(outputText);
        setOutputText(inputText);
    }
    
    const handleCopyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({ title: "Copied to clipboard!" });
    }

    const handleTextToSpeech = (text: string, lang: string) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        speechSynthesis.speak(utterance);
    }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Button variant="outline" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      <Card className="shadow-lg">
        <CardHeader className="text-center">
            <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                <Languages className="h-8 w-8" />
            </div>
            <CardTitle className="font-headline text-3xl pt-4">Local Language Translator</CardTitle>
            <CardDescription className="text-lg text-muted-foreground pt-2">
            “Break the Language Barrier.”
            </CardDescription>
        </CardHeader>
      </Card>
      
      <Card>
        <CardContent className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Input Side */}
            <div className="flex flex-col gap-2">
                <Select value={fromLang} onValueChange={setFromLang}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                        {languages.map(l => <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>)}
                    </SelectContent>
                </Select>
                <div className="relative flex-grow">
                    <Textarea 
                        placeholder="Enter text" 
                        className="h-full min-h-[150px] resize-none" 
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                    />
                    <div className="absolute bottom-2 right-2 flex gap-1">
                        <Button variant="ghost" size="icon"><Volume2 className="h-4 w-4" onClick={() => handleTextToSpeech(inputText, fromLang)}/></Button>
                        <Button variant="ghost" size="icon"><Copy className="h-4 w-4" onClick={() => handleCopyToClipboard(inputText)}/></Button>
                    </div>
                </div>
            </div>
            {/* Output Side */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <Select value={toLang} onValueChange={setToLang}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            {languages.map(l => <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>)}
                        </SelectContent>
                    </Select>
                    <Button variant="ghost" size="icon" onClick={handleSwitchLanguages}>
                        <Repeat className="h-5 w-5"/>
                    </Button>
                </div>
                 <div className="relative flex-grow">
                    <Textarea 
                        readOnly
                        className="h-full min-h-[150px] resize-none bg-muted" 
                        value={outputText}
                    />
                    <div className="absolute bottom-2 right-2 flex gap-1">
                        <Button variant="ghost" size="icon"><Volume2 className="h-4 w-4" onClick={() => handleTextToSpeech(outputText, toLang)}/></Button>
                        <Button variant="ghost" size="icon"><Copy className="h-4 w-4" onClick={() => handleCopyToClipboard(outputText)}/></Button>
                        <Button variant="ghost" size="icon"><Star className="h-4 w-4"/></Button>
                    </div>
                </div>
            </div>
        </CardContent>
        <CardFooter className="justify-center gap-4">
             <Button size="lg" disabled={isRecording} asChild>
                <Link href="/translator">
                    <Languages className="mr-2 h-4 w-4" /> Translate Now
                </Link>
            </Button>
            <Button size="lg" variant="secondary" onClick={() => setIsRecording(!isRecording)}>
                <Mic className={`mr-2 h-4 w-4 ${isRecording ? 'text-red-500 animate-pulse' : ''}`} />
                {isRecording ? 'Stop Listening' : 'Start Voice Input'}
            </Button>
        </CardFooter>
      </Card>
      
    </div>
  );
}
