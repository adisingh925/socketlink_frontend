import Image from "next/image";

const HowToPurchase = () => (
    <section id="getting-started" className="mb-14">
        <h2 className="text-2xl font-bold text-gray-300 mb-8">Purchasing Guide</h2>
        <div className="space-y-8">
            <p className="text-gray-400">
                <b>Step 1 :</b> Go to our{" "}
                <a
                    href="/pricing"
                    className="text-blue-400 hover:underline"
                >
                    Pricing
                </a>{" "}
                page and select the plan suitable for your requirement.
            </p>

            <Image
                src="/images/pricing.png"
                alt="Pricing Page Preview"
                width={800}
                height={400}
                className="w-full max-w-5xl rounded-2xl border-2 border-gray-600 shadow-lg"
            />

            <p className="text-gray-400">
                <b>Step 2 :</b> You will be asked to choose the region in which you want to setup your plan, It is advised to choose the region closest to your users for low latency.
            </p>

            <Image
                src="/images/choose-plan-region.png"
                alt="Choose Plan Region Preview"
                width={800}
                height={400}
                className="w-full max-w-5xl rounded-2xl border-2 border-gray-600 shadow-lg"
            />

            <p className="text-gray-400">
                <b>Step 3 :</b> After choosing the suitable plan and upon completion of the payment,
                you will be automatically redirected to the{" "}
                <a
                    href="/my-plans"
                    className="text-blue-400 hover:underline"
                >
                    My Plans
                </a>{" "}
                page, where you will be able to see the plan that you have chosen.
            </p>

            <Image
                src="/images/my-plans.png"
                alt="Pricing Page Preview"
                width={800}
                height={400}
                className="w-full max-w-5xl rounded-2xl border-2 border-gray-600 shadow-lg"
            />

            <p className="text-gray-400">
                <b>Step 4 :</b> It will take a few minutes to get your plan ready and as soon as it will become ready the <b>Account Status</b> will become <b>Active</b>.
            </p>
        </div>
    </section>
);

export default HowToPurchase;