'use client';

import React from 'react';
import { PaintRoller } from './PaintRoller';
import { PaintRollerNeo } from './PaintRollerNeo';
import { NeoCard, NeoCardContent } from '@/components/ui/neo-card';

export function PaintRollerDemo() {
  return (
    <div className="grid md:grid-cols-2 gap-8 p-8 bg-secondary-background">
      <NeoCard>
        <NeoCardContent className="p-8">
          <h3 className="text-xl font-heading font-bold mb-4 uppercase">CSS Modules Version</h3>
          <div className="flex items-center justify-center min-h-[400px]">
            <PaintRoller />
          </div>
          <p className="text-sm text-foreground/60 mt-4">
            Original orange color scheme with CSS modules
          </p>
        </NeoCardContent>
      </NeoCard>

      <NeoCard>
        <NeoCardContent className="p-8">
          <h3 className="text-xl font-heading font-bold mb-4 uppercase">Neobrutalist Version</h3>
          <div className="flex items-center justify-center min-h-[400px]">
            <PaintRollerNeo />
          </div>
          <p className="text-sm text-foreground/60 mt-4">Yellow theme matching the design system</p>
        </NeoCardContent>
      </NeoCard>

      <NeoCard className="md:col-span-2">
        <NeoCardContent className="p-8">
          <h3 className="text-xl font-heading font-bold mb-4 uppercase">Color Variations</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center min-h-[400px]">
                <PaintRollerNeo
                  primaryColor="#4ECDC4"
                  secondaryColor="#0099FF"
                  className="scale-50"
                />
              </div>
              <p className="text-sm font-bold">Blue/Cyan</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center min-h-[400px]">
                <PaintRollerNeo
                  primaryColor="#F38181"
                  secondaryColor="#AA96DA"
                  className="scale-50"
                />
              </div>
              <p className="text-sm font-bold">Pink/Purple</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center min-h-[400px]">
                <PaintRollerNeo
                  primaryColor="#95E1D3"
                  secondaryColor="#4ECDC4"
                  className="scale-50"
                />
              </div>
              <p className="text-sm font-bold">Mint/Teal</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center min-h-[400px]">
                <PaintRollerNeo
                  primaryColor="#FFD23F"
                  secondaryColor="#FF6B35"
                  borderColor="#000000"
                  className="scale-50"
                />
              </div>
              <p className="text-sm font-bold">Default</p>
            </div>
          </div>
        </NeoCardContent>
      </NeoCard>
    </div>
  );
}
