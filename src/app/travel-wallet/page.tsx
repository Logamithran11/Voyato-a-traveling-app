
'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Wallet, QrCode, Ticket, History, IndianRupee, PlusCircle, Send } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';

const transactions = [
    { type: 'debit', party: 'Goa State Museum', description: 'Entry Ticket', amount: -100, icon: Ticket },
    { type: 'credit', party: 'UPI Transfer', description: 'Added from Bank', amount: 5000, icon: PlusCircle },
    { type: 'debit', party: 'Anjuna Flea Market', description: 'Souvenirs', amount: -1500, icon: QrCode },
    { type: 'debit', "party": "Cafe Looda", "description": "Food & Drinks", "amount": -800, "icon": Wallet }
];

export default function TravelWalletPage() {

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
                <Wallet className="h-8 w-8" />
            </div>
            <CardTitle className="font-headline text-3xl pt-4">Cashless Travel Assistant</CardTitle>
            <CardDescription className="text-lg text-muted-foreground pt-2">
            “Pay Anywhere, Anytime.”
            </CardDescription>
        </CardHeader>
        <CardFooter className="justify-center">
            <Button asChild>
                <Link href="/travel-wallet">Activate Wallet</Link>
            </Button>
        </CardFooter>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
            <Card className="text-center">
                <CardHeader>
                    <CardTitle>Current Balance</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-5xl font-bold flex items-center justify-center">
                        <IndianRupee className="h-10 w-10" />
                        2,600
                    </p>
                </CardContent>
                <CardFooter className="grid grid-cols-2 gap-2">
                    <Button asChild>
                        <Link href="/travel-wallet"><PlusCircle className="mr-2 h-4 w-4"/> Add Money</Link>
                    </Button>
                    <Button variant="secondary" asChild>
                        <Link href="/travel-wallet"><Send className="mr-2 h-4 w-4"/> Send</Link>
                    </Button>
                </CardFooter>
            </Card>
            <Card>
                <CardContent className="p-4 flex flex-col items-center justify-center">
                    <Image src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=voyato-user@oksbi" alt="UPI QR Code" width={150} height={150} />
                    <p className="mt-2 text-sm font-semibold">Scan to Pay Me</p>
                    <p className="text-xs text-muted-foreground">voyato-user@oksbi</p>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><History/> Transaction History</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {transactions.map((tx, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <div className="p-3 bg-muted rounded-full">
                                    <tx.icon className={`h-5 w-5 ${tx.type === 'credit' ? 'text-green-500' : 'text-red-500'}`} />
                                </div>
                                <div className="flex-grow">
                                    <p className="font-semibold">{tx.party}</p>
                                    <p className="text-sm text-muted-foreground">{tx.description}</p>
                                </div>
                                <p className={`font-bold ${tx.type === 'credit' ? 'text-green-500' : ''}`}>
                                    {tx.amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                                </p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
